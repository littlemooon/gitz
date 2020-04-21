import React from 'react'
import Column from '../components/Column'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import { Static } from '../components/Static'
import Table from '../components/Table'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
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
                isFeatureBranch(branchQuery.state?.current) ? (
                  <Static>
                    <Column gap={1} paddingBottom={1}>
                      <LogText.Info prefix="Current:">{`${branchQuery.state?.current.issueId} ${branchQuery.state?.current.description}`}</LogText.Info>
                      <Table.Info
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
                    </Column>
                  </Static>
                ) : (
                  <Static>
                    <Column gap={1} paddingBottom={1}>
                      <LogText.Info prefix="Current:">
                        {branchQuery.state?.current.name}
                      </LogText.Info>
                      <Table.Info
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
                    </Column>
                  </Static>
                )
              ) : null
            },
          }}
        />
      )}
    </GitBranchProvider>
  )
}
