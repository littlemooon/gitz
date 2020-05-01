import { Color } from 'ink'
import React from 'react'
import Row from '../components/Row'
import { filterArray } from '../lib/array'
import { File, FileStatusContext, getFileStatusCount } from '../lib/file'
import LogText from './LogText'

export default function FileStatusCount({
  files,
  context,
}: {
  files: File[]
  context: FileStatusContext
}) {
  const count = getFileStatusCount(context, files)
  return (
    <Row gap={1}>
      {filterArray(
        Object.entries(count).map(([key, status]) => {
          return status.count ? (
            <LogText.Default key={key}>
              <Color {...status.color}>{key}</Color> {status.count}
            </LogText.Default>
          ) : null
        })
      )}
    </Row>
  )
}
