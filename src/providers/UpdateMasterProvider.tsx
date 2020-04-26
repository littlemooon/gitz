import React, { ReactNode, useMemo } from 'react'
import useGitQuery from '../hooks/useGitQuery'
import env from '../lib/env'
import { queries } from '../lib/gitOperations'
import CheckoutMutationProvider from '../providers/CheckoutMutationProvider'
import PullMutationProvider from '../providers/PullMutationProvider'

export default function UpdateMasterProvider({
  children,
}: {
  children?: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  const masterBranch = useMemo(() => {
    return branchQuery.state?.all.find(
      (branch) => branch.name === env.masterBranch
    )
  }, [branchQuery.state])

  const onMaster = useMemo(() => {
    return branchQuery.state?.current.name === masterBranch?.name
  }, [branchQuery.state, masterBranch])

  return onMaster ? (
    <PullMutationProvider branch={masterBranch}>
      {children}
    </PullMutationProvider>
  ) : (
    <CheckoutMutationProvider branch={masterBranch}>
      <PullMutationProvider branch={masterBranch}>
        <CheckoutMutationProvider branch={branchQuery.state?.current}>
          {children}
        </CheckoutMutationProvider>
      </PullMutationProvider>
    </CheckoutMutationProvider>
  )
}
