import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitQuery, { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/gitOperations'
import { StoreKey } from '../lib/store'

export default function GitStatusProvider({
  children,
}: {
  children: (statusQuery: GitQueryResponse<StoreKey.status>) => ReactNode
}) {
  const statusQuery = useGitQuery(queries.status, undefined)

  return (
    <GitRouter
      response={statusQuery}
      config={{
        [GitStatus.success]: function StatusSuccess() {
          return children(statusQuery)
        },
      }}
    />
  )
}
