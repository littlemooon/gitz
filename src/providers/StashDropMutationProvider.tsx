import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'

export default function StashDropMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashDropMutation = useGitMutation(mutations.stashDrop, undefined)

  useInit(stashDropMutation.run)

  return <GitRouter response={stashDropMutation}>{children}</GitRouter>
}
