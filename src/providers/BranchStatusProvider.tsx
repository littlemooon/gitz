import { Color } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import LogText from '../components/LogText'
import Row from '../components/Row'
import Static from '../components/Static'
import Table from '../components/Table'
import Title from '../components/Title'
import { isFeatureBranch } from '../lib/branch'
import BranchQueryProvider from '../providers/BranchQueryProvider'
import StatusQueryProvider from '../providers/StatusQueryProvider'

export default function BranchStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchQueryProvider>
      {(branchQuery) => (
        <StatusQueryProvider>
          {(statusQuery) => (
            <Column>
              <Static id="BranchStatusProvider">
                {isFeatureBranch(branchQuery.state?.current) ? (
                  <Column paddingTop={1} paddingBottom={1}>
                    <Title>Feature</Title>
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
                  </Column>
                ) : (
                  <Column paddingTop={1} paddingBottom={1}>
                    <Title>Branch</Title>
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
                  </Column>
                )}
              </Static>

              {children}
            </Column>
          )}
        </StatusQueryProvider>
      )}
    </BranchQueryProvider>
  )
}
