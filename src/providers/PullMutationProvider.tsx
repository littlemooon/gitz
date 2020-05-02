import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { mutations } from '../lib/mutations'

export default function PullMutationProvider({
  children,
  arg,
}: {
  children: ReactNode
  arg?: string
}) {
  const response = useGitMutation(mutations.pull, arg)

  return <GitRouter response={response}>{children}</GitRouter>
}
