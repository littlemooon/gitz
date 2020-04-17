import React from 'react'
import LogText from '../components/LogText'
import Router from '../components/Router'
import Table from '../components/Table'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/git'

export default function StatusCommand() {
  const response = useGitQuery(queries.status, undefined)

  return (
    <Router
      path={response.status}
      config={{
        [GitStatus.initial]: null,
        [GitStatus.loading]: <LogText.Loading>{response.name}</LogText.Loading>,
        [GitStatus.success]: (
          <Table.Success data={{ tracking: response.state?.tracking }} />
        ),
        [GitStatus.error]: (
          <LogText.Error prefix={response.name} exit>
            {response.error?.message}
          </LogText.Error>
        ),
      }}
    />
  )
}
