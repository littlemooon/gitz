import gitP, { SimpleGit } from 'simple-git/promise'
import { BranchSummary, StatusResult } from 'simple-git/typings/response'
import { Maybe } from '../types'
import { filterArray } from './array'
import { Branch, BranchFeature, isFeatureBranch, parseBranch } from './branch'
import env from './env'
import { setStoreItem, StoreItem, StoreKey } from './store'

export interface GitStore extends Partial<Record<StoreKey, StoreItem<any>>> {
  [StoreKey.status]?: StoreItem<StatusResult>
  [StoreKey.branches]?: StoreItem<{
    all: Branch[]
    feature: BranchFeature[]
    current: Branch
  }>
}

const git = gitP(env.rootDir)

export default git

export interface GitQuery<K extends StoreKey, R, A> {
  name: string
  key: K
  run: (a: A & { git: SimpleGit }) => Promise<R>
  set: (result?: R) => GitStore[K]
}

export interface GitMutation<R, A> {
  name: string
  run: (a: A & { git: SimpleGit }) => Promise<R>
}

function createGitQuery<K extends StoreKey, R, A>(
  input: GitQuery<K, R, A>
): GitQuery<K, R, A> {
  return input
}

function createGitMutation<R, A>(input: GitMutation<R, A>): GitMutation<R, A> {
  return input
}

export const queries = {
  status: createGitQuery({
    name: 'git status',
    key: StoreKey.status,
    run: ({ git }) => git.status(),
    set: (result?: StatusResult) => setStoreItem(StoreKey.status, result),
  }),

  branch: createGitQuery({
    name: 'git branch',
    key: StoreKey.branches,
    run: ({ git }) => git.branch(),
    set: (result?: BranchSummary) => {
      const branches = filterArray(
        Object.values(result?.branches ?? {}).map(parseBranch)
      )
      return setStoreItem(StoreKey.branches, {
        all: branches,
        feature: branches.filter(isFeatureBranch),
        current: branches.find((x) => x.current),
      })
    },
  }),
}

export const mutations = {
  checkout: createGitMutation<void, Maybe<Branch>>({
    name: 'git checkout',
    run: ({ git, name }) => {
      if (!name) {
        throw new Error('Cannot checkout undefined branch name')
      }
      return git.checkoutBranch(name, env.masterBranch)
    },
  }),
}
