import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitQuery from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { queries } from '../lib/queries'
import CheckoutMutationProvider from './CheckoutMutationProvider'
import StashCommitProvider from './StashCommitProvider'

export default function CheckoutProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const statusQuery = useGitQuery(queries.status, undefined)

  const current = branchQuery.state?.current
  const onBranch = current?.name === branch?.name

  return (
    <GitRouter response={branchQuery}>
      <GitRouter response={statusQuery}>
        {onBranch ? (
          children
        ) : (
          <StashCommitProvider
            Provider={({ children }: { children?: ReactNode }) => (
              <CheckoutMutationProvider branch={branch}>
                {children}
              </CheckoutMutationProvider>
            )}
          >
            {children}
          </StashCommitProvider>
        )}
      </GitRouter>
    </GitRouter>
  )
}
