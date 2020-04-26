import { Color } from 'ink'
import React, { ReactNode } from 'react'
import { isFeatureBranch } from '../lib/branch'
import GitBranchProvider from '../providers/GitBranchProvider'
import GitStatusProvider from '../providers/GitStatusProvider'
import Column from './Column'
import LogText from './LogText'
import Row from './Row'
import Static from './Static'
import Table from './Table'
import Title from './Title'

export default function BranchStatus({ children }: { children?: ReactNode }) {
  return (
    <GitBranchProvider>
      {(branchQuery) => (
        <GitStatusProvider>
          {(statusQuery) => (
            <Column>
              <Static id="BranchStatus">
                <Column paddingBottom={1}>
                  <Title>Status</Title>
                  {isFeatureBranch(branchQuery.state?.current) ? (
                    <Table.Info
                      data={{
                        issueId: (
                          <LogText.Default bold>
                            {branchQuery.state?.current.issueId}
                          </LogText.Default>
                        ),
                        description: (
                          <LogText.Default bold>
                            {branchQuery.state?.current.description}
                          </LogText.Default>
                        ),
                        branch: branchQuery.state?.current.name,
                        commit: `${branchQuery.state?.current.label} (${branchQuery.state?.current.commit})`,
                        tracking: statusQuery.state?.tracking,
                        commitDiff: (
                          <Row gap={1}>
                            <Color
                              green
                            >{`+ ${statusQuery.state?.ahead}`}</Color>
                            <Color
                              red
                            >{`- ${statusQuery.state?.behind}`}</Color>
                          </Row>
                        ),
                      }}
                    />
                  ) : (
                    <Table.Info
                      data={{
                        branch: (
                          <LogText.Default bold>
                            {branchQuery.state?.current.name}
                          </LogText.Default>
                        ),
                        commit: `${branchQuery.state?.current.label} (${branchQuery.state?.current.commit})`,
                        tracking: statusQuery.state?.tracking,
                      }}
                    />
                  )}
                </Column>
              </Static>
              {children}
            </Column>
          )}
        </GitStatusProvider>
      )}
    </GitBranchProvider>
  )
}
