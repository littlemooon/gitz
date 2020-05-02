import { useCallback, useEffect, useMemo } from 'react'
import { useAsync } from 'react-async'
import git from '../lib/git'
import { GitMutation } from '../lib/mutations'
import { GitOperationName } from '../lib/queries'
import { GitStatus } from './useGitQuery'

export interface GitMutationResponse<R> {
  type: 'mutation'
  name: GitOperationName
  state?: R
  status: GitStatus
  error?: Error
  run: () => void
}

export default function useGitMutation<R, A>(
  mutation: GitMutation<A, R>,
  arg?: A
): GitMutationResponse<R> {
  const { run, status, data, error, isInitial } = useAsync({
    deferFn: () => mutation.run(git, arg as A),
  })

  useEffect(() => {
    if (arg && isInitial) {
      run()
    }
  }, [arg, run, isInitial])

  const gitStatus = useMemo(() => {
    switch (status) {
      case 'initial':
        return GitStatus.initial
      case 'pending':
        return GitStatus.loading
      case 'fulfilled':
        return GitStatus.success
      default:
        return GitStatus.error
    }
  }, [status])

  const runCallback = useCallback(() => {
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arg])

  return {
    type: 'mutation',
    name: mutation.getName(arg),
    state: data,
    status: gitStatus,
    error,
    run: runCallback,
  }
}
