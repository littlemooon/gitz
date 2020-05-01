import { useEffect, useMemo, useState } from 'react'
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

export default function useGitMutation<R, I>(
  mutation: GitMutation<I, R>,
  item?: I
): GitMutationResponse<R> {
  const [set, setSet] = useState(false)

  const { run, status, data, error, isInitial } = useAsync({
    deferFn: () =>
      mutation.run(
        git.outputHandler(() => undefined),
        item as I
      ),
  })

  useEffect(() => {
    if (item && isInitial) {
      run()
    }
  }, [item, run, isInitial])

  useEffect(() => {
    if (status === 'fulfilled' && !set) {
      if (mutation.set && item) {
        mutation.set(item)
      }
      setSet(true)
    }
  }, [set, status, item, mutation])
  const gitStatus = useMemo(() => {
    switch (status) {
      case 'initial':
        return GitStatus.initial
      case 'pending':
        return GitStatus.loading
      case 'fulfilled':
        return set ? GitStatus.success : GitStatus.loading
      default:
        return GitStatus.error
    }
  }, [set, status])

  const { prefix, suffix } = mutation.getName(item)
  const name = useMemo(
    () => ({
      prefix,
      suffix,
    }),
    [prefix, suffix]
  )

  return {
    type: 'mutation',
    name,
    state: data,
    status: gitStatus,
    error,
    run,
  }
}
