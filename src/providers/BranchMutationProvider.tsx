import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'

export default function BranchMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const hasBranch =
    branch && branchQuery.state?.all.find((x) => x.name === branch.name)

  const checkoutBranchMutation = useGitMutation(
    mutations.checkoutBranch,
    hasBranch ? undefined : branch
  )

  return <GitRouter response={checkoutBranchMutation}>{children}</GitRouter>
}
