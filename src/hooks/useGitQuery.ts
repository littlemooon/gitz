import { useEffect, useMemo, useState } from 'react'
import { useAsync } from 'react-async'
import git, { GitQuery, GitStore } from '../lib/git'
import store, { getStoreItem, StoreKey } from '../lib/store'
import { Maybe } from '../types'

export enum GitStatus {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface GitQueryResponse<K extends StoreKey> {
  name: string
  state?: GitStore[K]
  status: GitStatus
  error?: Error
}

export default function useGitQuery<K extends StoreKey, R, A>(
  query: GitQuery<K, R, A>,
  args: A
): GitQueryResponse<K> {
  const [state, setState] = useState<Maybe<GitStore[K]>>(
    getStoreItem(query.key)
  )

  useEffect(() => {
    const unsubscribe = store.onDidChange(query.key, setState)
    return unsubscribe
  }, [query.key])

  const async = useAsync({
    promiseFn: query.run,
    git,
    ...args,
  })

  useEffect(() => {
    if (async.data) {
      query.set(async.data as R)
    }
  }, [async.data, query])

  useEffect(() => {
    if (async.error) {
      query.set(undefined)
    }
  }, [async.error, query])

  useEffect(() => {
    if (async.isInitial) {
      async.run()
    }
  }, [async])

  const status = useMemo(() => {
    switch (async.status) {
      case 'initial':
        return GitStatus.initial
      case 'pending':
        return GitStatus.loading
      case 'fulfilled':
        return GitStatus.success
      default:
        return GitStatus.error
    }
  }, [async.status])

  return {
    name: query.name,
    state,
    status,
    error: async.error,
  }
}
