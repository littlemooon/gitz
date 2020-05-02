import { useEffect, useMemo, useState } from 'react'
import { useAsync } from 'react-async'
import git from '../lib/git'
import { GitOperationName, GitQuery, GitStore } from '../lib/queries'
import store, { getStoreItem, StoreKey } from '../lib/store'
import { Maybe } from '../types'
import useConstant from './useConstant'

export enum GitStatus {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface GitQueryResponse<K extends StoreKey> {
  type: 'query'
  name: GitOperationName
  state?: GitStore[K]
  status: GitStatus
  error?: Error
}

export default function useGitQuery<K extends StoreKey, A, R>(
  query: GitQuery<K, A, R>,
  args: A
): GitQueryResponse<K> {
  const initialState = useConstant(() => getStoreItem(query.key))
  const [state, setState] = useState<Maybe<GitStore[K]>>(initialState)

  useEffect(() => {
    const unsubscribe = store.onDidChange(query.key, setState)
    return unsubscribe
  }, [query.key])

  const { data, error, status } = useAsync(
    state
      ? {
          deferFn: () =>
            query.run({
              git: git.outputHandler(() => undefined),
              ...args,
            }),
        }
      : {
          promiseFn: query.run,
          git,
          ...args,
        }
  )

  useEffect(() => {
    if (data) {
      query.set(data as R)
    }
  }, [data, query])

  useEffect(() => {
    if (error) {
      query.set(undefined)
    }
  }, [error, query])

  const gitStatus = useMemo(() => {
    switch (status) {
      case 'initial':
        return state ? GitStatus.success : GitStatus.initial
      case 'pending':
        return GitStatus.loading
      case 'fulfilled':
        return state ? GitStatus.success : GitStatus.loading
      default:
        return GitStatus.error
    }
  }, [status, state])

  return {
    type: 'query',
    name: query.getName(args),
    state,
    status: gitStatus,
    error,
  }
}
