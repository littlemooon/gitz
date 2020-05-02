import { useCallback, useEffect, useMemo } from 'react'
import { useAsync } from 'react-async'
import git from '../lib/git'
import { GitMutation } from '../lib/mutations'
import { GitOperationName } from '../lib/queries'
import { useStatic } from '../providers/StaticProvider'
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
  const { addStatic } = useStatic()
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

  const { title, content } = mutation.getName(arg)
  const name = useMemo(
    () => ({
      title,
      content,
    }),
    [title, content]
  )

  const runCallback = useCallback(() => {
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useDebug('useGitMutation', {
  //   type: 'mutation',
  //   name,
  //   state: data,
  //   status: gitStatus,
  //   error,
  //   run: runCallback,
  //   arg,
  // })

  return {
    type: 'mutation',
    name,
    state: data,
    status: gitStatus,
    error,
    run: runCallback,
  }
}
