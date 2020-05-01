import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'

export default function PushMutationProvider({
  children,
  arg,
}: {
  children: ReactNode
  arg?: string
}) {
  const pushMutation = useGitMutation(mutations.push, arg)

  useInit(pushMutation.run)

  return <GitRouter response={pushMutation}>{children}</GitRouter>
}
