import React from 'react'
import GitBoundary from '../components/GitBoundary'
import Table from '../components/Table'
import Title from '../components/Title'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/git'

export default function StatusCommand() {
  const status = useGitQuery(queries.status, undefined)

  return (
    <GitBoundary response={status}>
      <Title>Status</Title>
      <Table.Success data={{ tracking: status.state?.tracking }} />
    </GitBoundary>
  )
}
