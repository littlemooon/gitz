import { SimpleGit } from 'simple-git/promise'
import { Maybe } from '../types'
import { toArray } from './array'
import { Branch, isFeatureBranch } from './branch'
import { Commit } from './commit'
import env from './env'
import {
  GitOperationName,
  queries,
  updateQueries,
  updateQuery,
} from './queries'
import { getStoreItem, setStoreItem, StoreKey } from './store'

export interface GitMutation<I, R> {
  type: 'mutation'
  getName: (item?: I) => GitOperationName
  run: (git: SimpleGit, item: I) => Promise<R>
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
      await updateQueries(git)

      const branches = getStoreItem(StoreKey.branches)

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

      await updateQueries(git)
    },
  }),

  commit: createGitMutation<Commit>({
    getName: (commit) => ({
      title: 'Commit',
      content: [commit?.message],
    }),
    run: async (git, commit) => {
      await git.commit(commit.message)
      await updateQueries(git)
    },
  }),

  push: createGitMutation<Maybe<string>>({
    getName: (arg) => ({
      title: 'Push',
      content: [`origin ${arg}`],
    }),
    run: async (git, arg) => {
      await git.push('origin', arg)
      await updateQueries(git)
    },
  }),

  pull: createGitMutation<Maybe<string>>({
    getName: (arg) => ({
      title: 'Pull',
      content: [arg],
    }),
    run: async (git, arg) => {
      await git.pull(arg)
      await updateQueries(git)
    },
  }),

  rebase: createGitMutation<string>({
    getName: (arg) => ({
      title: 'Rebase',
      content: [arg],
    }),
    run: async (git, arg) => {
      await git.rebase([arg])
      await updateQueries(git)
    },
  }),

  add: createGitMutation<string | string[]>({
    getName: (paths) => ({
      title: 'Add',
      content: paths === '.' ? ['all files'] : toArray(paths),
    }),
    run: async (git, paths) => {
      await git.add(paths)
      await updateQueries(git)
    },
  }),

  reset: createGitMutation<string | string[]>({
    getName: (paths) => ({
      title: 'Reset',
      content: paths === '.' ? ['all files'] : toArray(paths),
    }),
    run: async (git, paths) => {
      await git.raw(['reset', ...toArray(paths)])
      await updateQueries(git)
    },
  }),

  stashPut: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash put',
    }),
    run: async (git) => {
      await git.stash()
      await updateQueries(git)
      await updateQuery(queries.stash, { git })
    },
  }),

  stashApply: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash apply',
    }),
    run: async (git) => {
      await git.stash(['apply'])
      await updateQueries(git)
      await updateQuery(queries.stash, { git })
    },
  }),

  stashPop: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash pop',
    }),
    run: async (git) => {
      await git.stash(['pop'])
      await updateQueries(git)
      await updateQuery(queries.stash, { git })
    },
  }),

  stashDrop: createGitMutation<undefined>({
    getName: () => ({
      title: 'Stash drop',
    }),
    run: async (git) => {
      await git.stash(['drop'])
      await updateQuery(queries.stash, { git })
    },
  }),
}
