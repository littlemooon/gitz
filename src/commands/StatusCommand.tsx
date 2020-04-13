import React from 'react'
import GitBoundary from '../components/GitBoundary'
import Table from '../components/Table'
import Title from '../components/Title'
import useGit from '../hooks/useGit'

export default function StatusCommand() {
  const { state } = useGit((git) => git.status(), { runWith: true })

  return (
    <GitBoundary name="git status" state={state}>
      <Title>Status</Title>
      <Table.Success data={{ tracking: state.result?.tracking }} />
    </GitBoundary>
  )
}
