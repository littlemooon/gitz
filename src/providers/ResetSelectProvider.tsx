import React, { ReactNode, useMemo, useState } from 'react'
import FileStatus from '../components/FileStatus'
import GitRouter from '../components/GitRouter'
import Radio, { RadioItem } from '../components/Radio'
import Warning from '../components/Warning'
import useGitQuery from '../hooks/useGitQuery'
import { filterArray } from '../lib/array'
import { CliCommandKey } from '../lib/command'
import { FileStatusType } from '../lib/file'
import { queries } from '../lib/queries'
import ResetMutationProvider from './ResetMutationProvider'

export default function ResetSelectProvider({
  children,
}: {
  children: ReactNode
}) {
  const [selected, setSelected] = useState<RadioItem[]>([])
  const statusQuery = useGitQuery(queries.status, undefined)
  const selectedPaths = selected.map((x) => x.id)

  const items = useMemo(
    () =>
      filterArray(
        statusQuery.state?.files
          .sort((a, b) => (a.path < b.path ? -1 : 1))
          .map((file) =>
            file.staged
              ? {
                  id: file.path,
                  content: (
                    <FileStatus file={file} context={FileStatusType.staged} />
                  ),
                }
              : undefined
          ) ?? []
      ),
    [statusQuery.state]
  )

  return (
    <GitRouter response={statusQuery}>
      {selected.length ? (
        <ResetMutationProvider paths={selectedPaths}>
          {children}
        </ResetMutationProvider>
      ) : items.length ? (
        <Radio
          title="Remove from staged files"
          items={items}
          onSelect={setSelected}
        />
      ) : (
        <Warning
          text="No staged files to reset"
          commands={[CliCommandKey.add, CliCommandKey.addAll]}
        />
      )}
    </GitRouter>
  )
}
