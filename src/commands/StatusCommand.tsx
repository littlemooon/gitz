import React from 'react'
import GitRouter from '../components/GitRouter'
import { Static } from '../components/Static'
import Table from '../components/Table'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/git'

export default function StatusCommand() {
  const response = useGitQuery(queries.status, undefined)

  return (
    <GitRouter
      response={response}
      config={{
        [GitStatus.success]: function StatusSuccess() {
          return response.state ? (
            <Static>
              <Table.Success data={{ tracking: response.state?.tracking }} />
            </Static>
          ) : null
        },
      }}
    />
  )
}
