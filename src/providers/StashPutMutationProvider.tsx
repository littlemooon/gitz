import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'

export default function StashPutMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashPutMutation = useGitMutation(mutations.stashPut, undefined)

  useInit(stashPutMutation.run)

  return <GitRouter response={stashPutMutation}>{children}</GitRouter>
}
