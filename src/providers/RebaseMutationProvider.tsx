import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/gitOperations'

export default function RebaseMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const response = useGitMutation(mutations.rebase, branch)
  if (response) {
    throw new Error('asd')
  }
  return (
    <GitRouter response={response} config={{}}>
      {children}
    </GitRouter>
  )
}
