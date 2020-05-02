import { Color } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Row from '../components/Row'
import Table from '../components/Table'
import Title from '../components/Title'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/queries'

export default function BranchStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const statusQuery = useGitQuery(queries.status, undefined)

  return (
    <GitRouter response={branchQuery}>
      <GitRouter response={statusQuery}>
        <Column>
          {branchQuery.state?.onFeature ? (
            <Column paddingTop={1} paddingBottom={1}>
              <Title>Feature</Title>
              <Table.Info
                data={{
                  issueId: (
                    <LogText.Default bold>
                      {branchQuery.state?.current?.issueId}
                    </LogText.Default>
                  ),
                  description: (
                    <LogText.Default bold>
                      {branchQuery.state?.current?.description}
                    </LogText.Default>
                  ),
                  branch: branchQuery.state?.current?.name,
                  diff: (
                    <Row gap={1}>
                      <Color
                        green
                        bold
                      >{`+ ${statusQuery.state?.ahead}`}</Color>
                      <Color red bold>{`- ${statusQuery.state?.behind}`}</Color>
                    </Row>
                  ),
                  commit: `${branchQuery.state?.current?.label} (${branchQuery.state?.current?.commit})`,
                  tracking: statusQuery.state?.tracking,
                }}
              />
            </Column>
          ) : branchQuery.state?.current ? (
            <Column paddingTop={1} paddingBottom={1}>
              <Title>Branch</Title>
              <Table.Info
                data={{
                  branch: (
                    <LogText.Default bold>
                      {branchQuery.state?.current.name}
                    </LogText.Default>
                  ),
                  diff: (
                    <Row gap={1}>
                      <Color
                        green
                        bold
                      >{`+ ${statusQuery.state?.ahead}`}</Color>
                      <Color red bold>{`- ${statusQuery.state?.behind}`}</Color>
                    </Row>
                  ),
                  commit: `${branchQuery.state?.current.label} (${branchQuery.state?.current.commit})`,
                  tracking: statusQuery.state?.tracking,
                }}
              />
            </Column>
          ) : (
            <Column paddingTop={1} paddingBottom={1}>
              <LogText.Warn prefix="No branches configured yet" />
            </Column>
          )}

          {children}
        </Column>
      </GitRouter>
    </GitRouter>
  )
}
