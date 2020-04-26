import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/gitOperations'
import BranchQueryProvider from './BranchQueryProvider'

export default function CheckoutMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const response = useGitMutation(mutations.checkout, branch)

  return (
    <BranchQueryProvider>
      {(branchQuery) =>
        branchQuery.state?.current.name === branch?.name ? (
          children
        ) : (
          <GitRouter response={response} config={{}}>
            {children}
          </GitRouter>
        )
      }
    </BranchQueryProvider>
  )
}
