/* eslint-disable @typescript-eslint/camelcase */
import { Color, ColorProps } from 'ink'
import React, { ReactNode, useMemo } from 'react'
import { FileStatusSumary } from 'simple-git/typings/response'
import Column from '../components/Column'
import Row from '../components/Row'
import Static from '../components/Static'
import Table from '../components/Table'
import StatusQueryProvider from '../providers/StatusQueryProvider'

const fileStatusMap: Record<
  'working_dir' | 'index',
  Record<string, ColorProps & { children: string }>
> = {
  index: {
    R: { children: 'R', green: true },
    M: { children: 'M', cyan: true },
    D: { children: 'D', red: true },
    A: { children: 'A', green: true },
  },
  working_dir: {
    R: { children: 'R', green: true },
    M: { children: 'M', cyan: true },
    D: { children: 'D', red: true },
    '?': { children: 'U', green: true },
  },
}

function FileStatusList({
  files,
  property,
}: {
  files: FileStatusSumary[]
  property: 'working_dir' | 'index'
}) {
  const mappedFiles = useMemo(() => {
    const keys = Object.values(fileStatusMap[property]).map(
      ({ children }) => children
    )

    return files
      .map((file) => ({
        path: file.path,
        status: fileStatusMap[property][file[property]],
      }))
      .filter((file) => Boolean(file.status))
      .sort((a, b) => {
        return keys.indexOf(a.status.children) > keys.indexOf(b.status.children)
          ? 1
          : -1
      })
  }, [files, property])

  return (
    <Column>
      {mappedFiles.map(({ path, status }) => (
        <Row gap={1} key={path}>
          <Color {...status} />
          {path}
        </Row>
      ))}
    </Column>
  )
}

export default function FileStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <StatusQueryProvider>
      {(statusQuery) => (
        <Column>
          <Static id="FileStatusProvider">
            <Column paddingBottom={1}>
              <Table.Info
                data={{
                  staged: (
                    <FileStatusList
                      files={statusQuery.state?.files ?? []}
                      property="index"
                    />
                  ),
                  local: (
                    <FileStatusList
                      files={statusQuery.state?.files ?? []}
                      property="working_dir"
                    />
                  ),
                }}
              />
            </Column>
          </Static>

          {children}
        </Column>
      )}
    </StatusQueryProvider>
  )
}
