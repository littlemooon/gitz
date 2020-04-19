import gitP, { SimpleGit } from 'simple-git/promise'
import {
  BranchSummary,
  CommitSummary,
  StatusResult,
} from 'simple-git/typings/response'
import { filterArray } from './array'
import { Branch, BranchFeature, isFeatureBranch, parseBranch } from './branch'
import { Commit } from './commit'
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

export interface GitOperationName {
  prefix: string
  suffix?: string
}

export interface GitQuery<K extends StoreKey, A, R> {
  getName: (args: A) => GitOperationName
  key: K
  run: (args: A & { git: SimpleGit }) => Promise<R>
  set: (result?: R) => GitStore[K]
}

export interface GitMutation<I, R> {
  getName: (item?: I) => GitOperationName
  run: (git: SimpleGit, item: I) => Promise<R>
}

function createGitQuery<K extends StoreKey, I, R>(
  input: GitQuery<K, I, R>
): GitQuery<K, I, R> {
  return input
}

function createGitMutation<I, R>(input: GitMutation<I, R>): GitMutation<I, R> {
  return input
}

export const queries = {
  status: createGitQuery({
    getName: () => ({ prefix: 'Current status' }),
    key: StoreKey.status,
    run: ({ git }) => git.status(),
    set: (result?: StatusResult) => setStoreItem(StoreKey.status, result),
  }),

  branch: createGitQuery({
    getName: () => ({ prefix: 'Branch status' }),
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
  checkout: createGitMutation<Branch, void>({
    getName: (branch) => ({
      prefix: 'Switch branch:',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.checkout(branch?.name)
    },
  }),

  checkoutBranch: createGitMutation<Branch, void>({
    getName: (branch) => ({
      prefix: 'Create branch:',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.checkoutBranch(branch?.name, env.masterBranch)
    },
  }),

  commit: createGitMutation<Commit, CommitSummary>({
    getName: (commit) => ({
      prefix: 'Commit:',
      suffix: commit?.message,
    }),
    run: (git, commit) => {
      return git.commit(commit.message)
    },
  }),
}
