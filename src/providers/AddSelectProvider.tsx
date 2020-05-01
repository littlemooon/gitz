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
import AddMutationProvider from './AddMutationProvider'
import CommandSelectProvider from './CommandSelectProvider'
import FileStatusProvider from './FileStatusProvider'

export default function AddSelectProvider({
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
        statusQuery.state?.files.map((file) =>
          file.working
            ? {
                id: file.path,
                content: (
                  <FileStatus file={file} context={FileStatusType.working} />
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
        <AddMutationProvider paths={selectedPaths}>
          <FileStatusProvider>{children}</FileStatusProvider>
        </AddMutationProvider>
      ) : items.length ? (
        <Radio items={items} onSelect={setSelected} />
      ) : (
        <Warning title="No changed files to add">
          <FileStatusProvider>
            <CommandSelectProvider
              keys={[CliCommandKey.commit, CliCommandKey.push]}
            >
              {children}
            </CommandSelectProvider>
          </FileStatusProvider>
        </Warning>
      )}
    </GitRouter>
  )
}
