import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'

export default function BranchMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const checkoutBranchMutation = useGitMutation(
    mutations.checkoutBranch,
    branch
  )

  return <GitRouter response={checkoutBranchMutation}>{children}</GitRouter>
}
