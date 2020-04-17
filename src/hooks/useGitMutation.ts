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
  const { run, status, data, error, isInitial } = useAsync({
    deferFn: () =>
      mutation.run(
        git.outputHandler(() => undefined),
        args
      ),
  })

  useEffect(() => {
    if (args && isInitial) {
      run()
    }
  }, [args, run, isInitial])

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

  return {
    name: mutation.name,
    state: data,
    status: gitStatus,
    run: run,
    error,
  }
}
