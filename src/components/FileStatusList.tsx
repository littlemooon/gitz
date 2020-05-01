import React, { useMemo } from 'react'
import Column from '../components/Column'
import { File, fileStatusKeys, FileStatusType } from '../lib/file'
import FileStatus from './FileStatus'

export default function FileStatusList({
  files,
  context,
}: {
  files: File[]
  context: FileStatusType
}) {
  const sorted = useMemo(() => {
    return files
      .filter((file) => Boolean(file[context]))
      .sort((a, b) => {
        const astatus = a[context]
        const bstatus = b[context]
        return astatus && bstatus
          ? fileStatusKeys.indexOf(astatus.key) >
            fileStatusKeys.indexOf(bstatus.key)
            ? 1
            : -1
          : 0
      })
  }, [files, context])

  return (
    <Column>
      {sorted.map((file) => (
        <FileStatus key={file.path} file={file} context={context} />
      ))}
    </Column>
  )
}
