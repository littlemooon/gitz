import { SimpleGit } from 'simple-git/promise'
import { CommitSummary, PullResult } from 'simple-git/typings/response'
import { Branch } from './branch'
import { Commit } from './commit'
import env from './env'
import { GitOperationName } from './queries'
import store, { setStoreItem, StoreKey } from './store'

export interface GitMutation<I, R> {
  type: 'mutation'
  getName: (item?: I) => GitOperationName
  run: (git: SimpleGit, item: I) => Promise<R>
  set?: (item: I) => void
}

function createGitMutation<I, R>(
  input: Omit<GitMutation<I, R>, 'type'>
): GitMutation<I, R> {
  return { type: 'mutation', ...input }
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
          return x.name === branch.name
            ? { ...x, lastCheckout: Date.now(), current: true }
            : { ...x, current: false }
        }),
        current: { ...branch, current: true },
      })
    },
  }),

  checkoutBranch: createGitMutation<Branch, string>({
    getName: (branch) => ({
      prefix: 'Create branch',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.raw([
        'checkout',
        '-b',
        branch?.name,
        '--track',
        `origin/${env.masterBranch}`,
      ])
      // .then(() => {
      //   git.raw(['branch', '--set-upstream-to', `origin/${branch?.name}`])
      // })
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

  rebase: createGitMutation<Branch, string>({
    getName: (branch) => ({
      prefix: 'Rebase',
      suffix: branch?.name,
    }),
    run: (git, branch) => {
      return git.rebase([branch.name])
    },
  }),
}
