import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useFirst from '../hooks/useFirst'
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
  const current = useFirst(() => branchQuery.state?.current)
  const onBranch = current?.name === branch?.name

  const response = useGitMutation(
    mutations.checkout,
    onBranch ? undefined : branch
  )

  return (
    <GitRouter response={branchQuery}>
      {onBranch ? (
        children
      ) : (
        <GitRouter response={response}>{children}</GitRouter>
      )}
    </GitRouter>
  )
}
