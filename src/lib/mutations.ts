import { SimpleGit } from 'simple-git/promise'
import { CommitSummary, PullResult } from 'simple-git/typings/response'
import { Maybe } from '../types'
import { toArray } from './array'
import { Branch, isFeatureBranch } from './branch'
import { Commit } from './commit'
import env from './env'
import { GitOperationName, queries, updateQuery } from './queries'
import store, { setStoreItem, StoreKey } from './store'

export interface GitMutation<I, R> {
  type: 'mutation'
  getName: (item?: I) => GitOperationName
  run: (git: SimpleGit, item: I) => Promise<R>
  set?: (git: SimpleGit, item: I) => Promise<void>
}

function createGitMutation<I, R = void>(
  input: Omit<GitMutation<I, R>, 'type'>
): GitMutation<I, R> {
  return { type: 'mutation', ...input }
}

export const mutations = {
  checkout: createGitMutation<Branch>({
    getName: (branch) => ({
      title: 'Switch branch',
      content: [branch?.name],
    }),
    run: async (git, branch) => {
      await git.checkout(branch?.name)
      await updateQuery(queries.branch, { git })
      const branches = store.get(StoreKey.branches)

      setStoreItem(StoreKey.branches, {
        all: branches?.all.map((x) => {
          return x.name === branch.name
            ? { ...x, lastCheckout: Date.now(), current: true }
            : { ...x, current: false }
        }),
        current: { ...branch, current: true },
        onFeature: isFeatureBranch(branch),
      })
    },
  }),

  checkoutBranch: createGitMutation<Branch>({
    getName: (branch) => ({
      title: 'Create branch',
      content: [branch?.name],
    }),
    run: async (git, branch) => {
      await git.raw([
        'checkout',
        '-b',
        branch?.name,
        '--track',
        `origin/${env.masterBranch}`,
      ])
      // .then(() => {
      //   git.raw(['branch', '--set-upstream-to', `origin/${branch?.name}`])
      // })

      await updateQuery(queries.branch, { git })
    },
  }),

  commit: createGitMutation<Commit, CommitSummary>({
    getName: (commit) => ({
      title: 'Commit',
      content: [commit?.message],
    }),
    run: async (git, commit) => {
      const r = await git.commit(commit.message)
      await updateQuery(queries.status, { git })
      return r
    },
  }),

  push: createGitMutation<Maybe<string>>({
    getName: (arg) => ({
      title: 'Push',
      content: [`origin ${arg}`],
    }),
    run: (git, arg) => {
      return git.push('origin', arg)
    },
  }),

  pull: createGitMutation<Branch, PullResult>({
    getName: (branch) => ({
      title: 'Pull',
      content: [branch?.name],
    }),
    run: (git, branch) => {
      return git.pull('origin', branch?.name)
    },
  }),

  rebase: createGitMutation<Branch, string>({
    getName: (branch) => ({
      title: 'Rebase',
      content: [branch?.name],
    }),
    run: (git, branch) => {
      return git.rebase([branch.name])
    },
  }),

  add: createGitMutation<string | string[]>({
    getName: (paths) => ({
      title: 'Add',
      content: paths === '.' ? ['all files'] : toArray(paths),
    }),
    run: async (git, paths) => {
      await git.add(paths)
      await updateQuery(queries.status, { git })
    },
  }),

  reset: createGitMutation<string | string[]>({
    getName: (paths) => ({
      title: 'Reset',
      content: paths === '.' ? ['all files'] : toArray(paths),
    }),
    run: async (git, paths) => {
      await git.raw(['reset', ...toArray(paths)])
      await updateQuery(queries.status, { git })
    },
  }),

  stashPut: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash push',
    }),
    run: async (git) => {
      await git.stash()
      await updateQuery(queries.status, { git })
      await updateQuery(queries.stash, { git })
    },
  }),

  stashApply: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash apply',
    }),
    run: async (git) => {
      await git.raw(['stash', 'apply'])
    },
  }),

  stashDrop: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash drop',
    }),
    run: async (git) => {
      await git.raw(['stash', 'drop'])
      await updateQuery(queries.stash, { git })
    },
  }),
}
