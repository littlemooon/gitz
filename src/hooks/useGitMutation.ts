import { useEffect, useMemo } from 'react'
import { useAsync } from 'react-async'
import git, { GitMutation } from '../lib/git'
import { GitStatus } from './useGitQuery'

export interface GitMutationResponse<R> {
  name: string
  state?: R
  status: GitStatus
  error?: Error
  run: () => void
}

export default function useGitMutation<R, A>(
  mutation: GitMutation<R, A>,
  args: A
): GitMutationResponse<R> {
  const async = useAsync({
    promiseFn: mutation.run,
    git,
    ...args,
  })

  useEffect(() => {
    if (args) {
      async.run()
    }
  }, [args, async])

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
    name: mutation.name,
    state: async.data,
    status,
    run: async.run,
    error: async.error,
  }
}
