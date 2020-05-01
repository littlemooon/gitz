import React, { ReactNode } from 'react'
import Column from '../components/Column'
import FileStatusList from '../components/FileStatusList'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Static from '../components/Static'
import Table from '../components/Table'
import Title from '../components/Title'
import useGitQuery from '../hooks/useGitQuery'
import { FileStatusType } from '../lib/file'
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
        <Static>
          <Column paddingBottom={1}>
            <Title>Files</Title>
            <Table.Info
              data={Object.values(FileStatusType).reduce((acc, context) => {
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
