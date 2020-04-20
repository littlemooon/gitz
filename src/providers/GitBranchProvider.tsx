import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitQuery, { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/git'
import { StoreKey } from '../lib/store'

export default function GitBranchProvider({
  children,
}: {
  children: (branchQuery: GitQueryResponse<StoreKey.branches>) => ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <GitRouter
      response={branchQuery}
      config={{
        [GitStatus.success]: function BranchesSuccess() {
          return children(branchQuery)
        },
      }}
    />
  )
}
