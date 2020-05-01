import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'

export default function StashPushMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashPushMutation = useGitMutation(mutations.stashPush, undefined)

  useInit(stashPushMutation.run)

  return <GitRouter response={stashPushMutation}>{children}</GitRouter>
}
