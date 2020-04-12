import React from 'react'
import useGit from '../../hooks/useGit'
import GitBoundary from '../GitBoundary'
import Table from '../Table'

export default function Status() {
  const { state } = useGit((git) => git.status(), { runWith: true })

  return (
    <GitBoundary name="git status" state={state}>
      <Table.Success exit data={{ tracking: state.result?.tracking }} />
    </GitBoundary>
  )
}
