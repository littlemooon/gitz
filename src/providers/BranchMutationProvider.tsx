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
  const response = useGitMutation(mutations.checkoutBranch, branch)

  return (
    <GitRouter response={branchQuery}>
      {branchQuery.state?.all.find(({ name }) => name === branch?.name) ? (
        <>{children}</>
      ) : (
        <GitRouter response={response}>{children}</GitRouter>
      )}
    </GitRouter>
  )
}
