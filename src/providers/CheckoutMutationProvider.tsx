import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'

export default function CheckoutMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const onBranch = branch && branchQuery.state?.current?.name === branch?.name

  const checkoutMutation = useGitMutation(
    mutations.checkout,
    onBranch ? undefined : branch
  )

  return <GitRouter response={checkoutMutation}>{children}</GitRouter>
}
