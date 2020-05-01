import { useApp } from 'ink'
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Command from '../components/Command'
import GitRouter from '../components/GitRouter'
import Select, { SelectItem } from '../components/Select'
import useGitQuery from '../hooks/useGitQuery'
import { filterArray } from '../lib/array'
import { CliCommandKey, cliCommands, exposedCliCommands } from '../lib/command'
import { queries } from '../lib/queries'
import { getMaxLength, join } from '../lib/string'

export default function CommandSelectProvider({
  keys,
  children,
}: {
  children?: ReactNode
  keys?: CliCommandKey[]
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const statusQuery = useGitQuery(queries.status, undefined)

  const { exit } = useApp()
  const [command, setCommand] = useState<CliCommandKey | undefined>()

  const handleSelect = useCallback(
    (item: SelectItem) => {
      if (item.id === 'exit') {
        exit()
      } else {
        setCommand(item.id as CliCommandKey)
      }
    },
    [setCommand, exit]
  )

  const onFeature = branchQuery.state?.onFeature
  const hasWorkingChanges = statusQuery.state?.hasWorkingChanges
  const hasStagedChanges = statusQuery.state?.hasStagedChanges

  const items: SelectItem[] = useMemo(() => {
    const selected = keys
      ? Object.values(cliCommands).filter((x) => keys.includes(x.key))
      : exposedCliCommands

    const exposed = keys
      ? exposedCliCommands.filter((x) => !keys?.includes(x.key))
      : []

    const commands = [...selected, ...exposed].filter((x) => {
      return [
        x.require?.feature ? onFeature : true,
        x.require?.staged ? hasStagedChanges : true,
        x.require?.working ? hasWorkingChanges : true,
        x.require?.changes ? hasStagedChanges || hasWorkingChanges : true,
        x.require?.ahead ? statusQuery.state?.ahead : true,
      ].every(Boolean)
    })

    const maxLength = getMaxLength(commands.map((x) => x.key))
    return filterArray(
      commands.map((command) => ({
        label: join(
          [
            command.key.padEnd(command.shortcut ? maxLength : maxLength + 3),
            command.description,
          ],
          '    '
        ),
        id: command.key,
        shortcut: command.shortcut,
      }))
    )
  }, [hasStagedChanges, hasWorkingChanges, keys, onFeature, statusQuery.state])

  return (
    <GitRouter response={branchQuery}>
      {command ? (
        <Command command={cliCommands[command]}>
          {children ?? <CommandSelectProvider />}
        </Command>
      ) : (
        <Select
          title="Commands"
          onSelect={handleSelect}
          items={[...items, { id: 'exit', label: 'exit', shortcut: 'x' }]}
        />
      )}
    </GitRouter>
  )
}
