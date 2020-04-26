import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/gitOperations'

export default function PullMutationProvider({
  children,
  branch,
}: {
  children: ReactNode
  branch?: Branch
}) {
  const response = useGitMutation(mutations.pull, branch)

  return (
    <GitRouter response={response} config={{}}>
      {children}
    </GitRouter>
  )
}
