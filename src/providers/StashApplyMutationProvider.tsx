import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'

export default function StashApplyMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashPopMutation = useGitMutation(mutations.stashApply, undefined)

  useInit(stashPopMutation.run)

  return <GitRouter response={stashPopMutation}>{children}</GitRouter>
}
