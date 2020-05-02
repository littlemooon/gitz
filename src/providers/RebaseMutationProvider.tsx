import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { mutations } from '../lib/mutations'

export default function RebaseMutationProvider({
  arg,
  children,
}: {
  arg?: string
  children: ReactNode
}) {
  const rebaseMutation = useGitMutation(mutations.rebase, arg)

  return <GitRouter response={rebaseMutation}>{children}</GitRouter>
}
