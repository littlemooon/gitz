import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitQuery from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { queries } from '../lib/queries'
import BranchMutationProvider from './BranchMutationProvider'
import StashCommitProvider from './StashCommitProvider'

export default function BranchProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <GitRouter response={branchQuery}>
      {branchQuery.state?.all.find(({ name }) => name === branch?.name) ? (
        <>{children}</>
      ) : (
        <StashCommitProvider
          Provider={({ children }: { children?: ReactNode }) => (
            <BranchMutationProvider branch={branch}>
              {children}
            </BranchMutationProvider>
          )}
        >
          {children}
        </StashCommitProvider>
      )}
    </GitRouter>
  )
}
