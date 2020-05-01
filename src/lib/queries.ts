import { SimpleGit } from 'simple-git/promise'
import {
  BranchSummary,
  DefaultLogFields,
  ListLogSummary,
  StatusResult,
} from 'simple-git/typings/response'
import { filterArray } from './array'
import { Branch, FeatureBranch, isFeatureBranch, parseBranch } from './branch'
import { File, parseFile } from './file'
import { parseStash, Stash } from './stash'
import store, { setStoreItem, StoreItem, StoreKey } from './store'

export interface GitStore extends Partial<Record<StoreKey, StoreItem<any>>> {
  [StoreKey.status]?: StoreItem<{
    files: File[]
    ahead: number
    behind: number
    tracking?: string
    hasWorkingChanges: boolean
    hasStagedChanges: boolean
  }>
  [StoreKey.branches]?: StoreItem<{
    all: Branch[]
    feature: FeatureBranch[]
    current?: Branch
    onFeature: boolean
  }>
  [StoreKey.stash]?: StoreItem<{
    all: Stash[]
    total: number
    latest?: Stash
  }>
}

export interface GitOperationName {
  title: string
  content?: Array<string | undefined>
}

export interface GitQuery<K extends StoreKey, A, R> {
  type: 'query'
  getName: (args: A) => GitOperationName
  key: K
  run: (args: A & { git: SimpleGit }) => Promise<R>
  set: (result?: R) => GitStore[K]
}

function createGitQuery<K extends StoreKey, A, R>(
  input: Omit<GitQuery<K, A, R>, 'type'>
): GitQuery<K, A, R> {
  return { type: 'query', ...input }
}

export const queries = {
  status: createGitQuery({
    getName: () => ({ title: 'Current status' }),
    key: StoreKey.status,
    run: ({ git }) => git.status(),
    set: (result?: StatusResult) => {
      const files = result?.files.map(parseFile) ?? []

      return setStoreItem(StoreKey.status, {
        files,
        ahead: result?.ahead ?? 0,
        behind: result?.behind ?? 0,
        tracking: result?.tracking,
        hasWorkingChanges: Boolean(files.find((x) => x.working?.key)),
        hasStagedChanges: Boolean(files.find((x) => x.staged?.key)),
      })
    },
  }),

  branch: createGitQuery({
    getName: () => ({ title: 'Branch status' }),
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

      const current = branches.find((x) => x.current)

      return setStoreItem(StoreKey.branches, {
        all: branches,
        current,
        onFeature: isFeatureBranch(current),
      })
    },
  }),

  stash: createGitQuery({
    getName: () => ({ title: 'Stash' }),
    key: StoreKey.stash,
    run: ({ git }) => git.stashList(),
    set: (result?: ListLogSummary<DefaultLogFields>) => {
      return setStoreItem(StoreKey.stash, {
        all: result?.all.map(parseStash) ?? [],
        total: result?.total,
        latest: result?.latest ? parseStash(result?.latest) : undefined,
      })
    },
  }),
}

export async function updateQuery<K extends StoreKey, A, R>(
  query: GitQuery<K, A, R>,
  args: A & { git: SimpleGit }
) {
  const result = await query.run(args)
  query.set(result)
  return result
}
