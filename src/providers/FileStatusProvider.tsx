import React, { ReactNode } from 'react'
import Column from '../components/Column'
import FileStatusList from '../components/FileStatusList'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Static from '../components/Static'
import Table from '../components/Table'
import useGitQuery from '../hooks/useGitQuery'
import { FileStatusContext } from '../lib/file'
import { queries } from '../lib/queries'

export default function FileStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  const statusQuery = useGitQuery(queries.status, undefined)

  return (
    <GitRouter response={statusQuery}>
      <Column>
        <Static id="FileStatusProvider">
          <Column paddingBottom={1}>
            <Table.Info
              data={Object.values(FileStatusContext).reduce((acc, context) => {
                return {
                  ...acc,
                  [context]: statusQuery.state?.files ? (
                    <FileStatusList
                      files={statusQuery.state?.files}
                      context={context}
                    />
                  ) : (
                    <LogText.Info>No {context} files</LogText.Info>
                  ),
                }
              }, {})}
            />
          </Column>
        </Static>

        {children}
      </Column>
    </GitRouter>
  )
}
