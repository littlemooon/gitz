import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useInit from '../hooks/useInit'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'

export default function PushMutationProvider({
  children,
  branch,
}: {
  children: ReactNode
  branch?: Branch
}) {
  const pushMutation = useGitMutation(mutations.push, branch)

  useInit(pushMutation.run)

  return <GitRouter response={pushMutation}>{children}</GitRouter>
}
