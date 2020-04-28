import { SimpleGit } from 'simple-git/promise'
import {
  BranchSummary,
  CommitSummary,
  PullResult,
  StatusResult,
} from 'simple-git/typings/response'
import { filterArray } from './array'
import { Branch, FeatureBranch, parseBranch } from './branch'
import { Commit } from './commit'
import env from './env'
import store, { setStoreItem, StoreItem, StoreKey } from './store'

export interface GitStore extends Partial<Record<StoreKey, StoreItem<any>>> {
  [StoreKey.status]?: StoreItem<StatusResult>
  [StoreKey.branches]?: StoreItem<{
    all: Branch[]
    feature: FeatureBranch[]
    current: Branch
  }>
}

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
  set?: (item: I) => void
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
      const existing = store.get(StoreKey.branches)

      const branches = filterArray(
        Object.values(result?.branches ?? {}).map((branch) => {
          const existingBranch = existing?.all.find(
            (x) => x.name === branch.name
          )
          return parseBranch({
            ...existingBranch,
            ...branch,
            created: existingBranch?.created ?? Date.now(),
            lastCheckout: existingBranch?.lastCheckout ?? Date.now(),
          })
        })
      )

      return setStoreItem(StoreKey.branches, {
        all: branches,
        current: branches.find((x) => x.current),
      })
    },
  }),
}

export const mutations = {
  checkout: createGitMutation<Branch, void>({
    getName: (branch) => ({
      prefix: 'Switch branch',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.checkout(branch?.name)
    },
    set: (branch) => {
      const branches = store.get(StoreKey.branches)

      return setStoreItem(StoreKey.branches, {
        all: branches?.all.map((x) => {
          return x.name === branch.name ? { ...x, lastCheckout: Date.now() } : x
        }),
        current: branch,
      })
    },
  }),

  checkoutBranch: createGitMutation<Branch, void>({
    getName: (branch) => ({
      prefix: 'Create branch',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.checkoutBranch(branch?.name, env.masterBranch)
    },
  }),

  commit: createGitMutation<Commit, CommitSummary>({
    getName: (commit) => ({
      prefix: 'Commit',
      suffix: commit?.message,
    }),
    run: (git, commit) => {
      return git.commit(commit.message)
    },
  }),

  pull: createGitMutation<Branch, PullResult>({
    getName: (branch) => ({
      prefix: 'Pull',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.pull('origin', branch?.name)
    },
  }),
}
