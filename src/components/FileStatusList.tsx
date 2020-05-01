import { Color } from 'ink'
import React, { useMemo } from 'react'
import Column from '../components/Column'
import Row from '../components/Row'
import { File, FileStatusContext, fileStatusKeys } from '../lib/file'

export default function FileStatusList({
  files,
  context,
}: {
  files: File[]
  context: FileStatusContext
}) {
  const mappedFiles = useMemo(() => {
    return files
      .map((file) => ({
        path: file.path,
        status: file[context],
      }))
      .filter((file) => Boolean(file.status))
      .sort((a, b) => {
        return a.status && b.status
          ? fileStatusKeys.indexOf(a.status.key) >
            fileStatusKeys.indexOf(b.status.key)
            ? 1
            : -1
          : 0
      })
  }, [files, context])

  return (
    <Column>
      {mappedFiles.map(({ path, status }) => (
        <Row gap={1} key={path}>
          <Color {...status?.color}>{status?.key}</Color>
          {path}
        </Row>
      ))}
    </Column>
  )
}
