import { SimpleGit } from 'simple-git/promise'
import { BranchSummary, StatusResult } from 'simple-git/typings/response'
import { filterArray } from './array'
import { Branch, FeatureBranch, parseBranch } from './branch'
import { File, parseFile } from './file'
import store, { setStoreItem, StoreItem, StoreKey } from './store'

export interface GitStore extends Partial<Record<StoreKey, StoreItem<any>>> {
  [StoreKey.status]?: StoreItem<{
    files: File[]
    ahead: number
    behind: number
    tracking?: string
  }>
  [StoreKey.branches]?: StoreItem<{
    all: Branch[]
    feature: FeatureBranch[]
    current?: Branch
  }>
}

export interface GitOperationName {
  prefix: string
  suffix?: string
}

export interface GitQuery<K extends StoreKey, A, R> {
  type: 'query'
  getName: (args: A) => GitOperationName
  key: K
  run: (args: A & { git: SimpleGit }) => Promise<R>
  set: (result?: R) => GitStore[K]
}

function createGitQuery<K extends StoreKey, I, R>(
  input: Omit<GitQuery<K, I, R>, 'type'>
): GitQuery<K, I, R> {
  return { type: 'query', ...input }
}

export const queries = {
  status: createGitQuery({
    getName: () => ({ prefix: 'Current status' }),
    key: StoreKey.status,
    run: ({ git }) => git.status(),
    set: (result?: StatusResult) => {
      const files = result?.files.map(parseFile) ?? []

      return setStoreItem(StoreKey.status, {
        files,
        ahead: result?.ahead ?? 0,
        behind: result?.behind ?? 0,
        tracking: result?.tracking,
      })
    },
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
