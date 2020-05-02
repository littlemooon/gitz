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
          {branchQuery.state?.current ? (
            <Column paddingBottom={1}>
              <Title>Branch</Title>
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
          ) : branchQuery.state?.all.length ? (
            <Column paddingBottom={1}>
              <LogText.Warn prefix="Merge conflicts">
                <Column>
                  <LogText.Default>Manually fix conflicts</LogText.Default>
                  <LogText.Default>Add fixed files: `gitx d`</LogText.Default>
                  <LogText.Default>
                    Continue the rebase: `git rebase --continue`
                  </LogText.Default>
                  <LogText.Default>
                    Or abort the rebase: `git rebase --abort`
                  </LogText.Default>
                </Column>
              </LogText.Warn>
            </Column>
          ) : (
            <Column paddingBottom={1}>
              <LogText.Warn prefix="No branches configured yet" />
            </Column>
          )}

          {children}
        </Column>
      </GitRouter>
    </GitRouter>
  )
}
