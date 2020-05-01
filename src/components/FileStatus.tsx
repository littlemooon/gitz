import { Color } from 'ink'
import React from 'react'
import Row from '../components/Row'
import { File, FileStatusType } from '../lib/file'

export default function FileStatus({
  file,
  context,
}: {
  file: File
  context: FileStatusType
}) {
  const status = file[context]
  return (
    <Row gap={1} key={file.path}>
      <Color {...status?.color}>{status?.key}</Color>
      {file.path}
    </Row>
  )
}
