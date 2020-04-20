import React from 'react'
import GitRouter from '../components/GitRouter'
import { Static } from '../components/Static'
import Table from '../components/Table'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/git'
import GitBranchProvider from '../providers/GitBranchProvider'

export default function StatusCommand() {
  const response = useGitQuery(queries.status, undefined)

  return (
    <GitBranchProvider>
      {(branchQuery) => (
        <GitRouter
          response={response}
          config={{
            [GitStatus.success]: function StatusSuccess() {
              return response.state ? (
                <Static>
                  <Table.Success
                    data={{
                      issueId: branchQuery.state?.current.issueId,
                      description: branchQuery.state?.current.description,
                      label: branchQuery.state?.current.label,
                      commit: branchQuery.state?.current.commit,
                      current: branchQuery.state?.current.current,
                      name: branchQuery.state?.current.name,
                      tracking: response.state?.tracking,
                    }}
                  />
                </Static>
              ) : null
            },
          }}
        />
      )}
    </GitBranchProvider>
  )
}
