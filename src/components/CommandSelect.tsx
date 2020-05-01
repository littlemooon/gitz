import { useApp } from 'ink'
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Command from '../components/Command'
import Select, { SelectItem } from '../components/Select'
import useGitQuery from '../hooks/useGitQuery'
import { filterArray } from '../lib/array'
import {
  CliCommand,
  CliCommandKey,
  cliCommands,
  defaultCliCommands,
} from '../lib/command'
import { queries } from '../lib/queries'
import { join } from '../lib/string'
import GitRouter from './GitRouter'

export default function CommandSelect({
  commands = defaultCliCommands,
  children,
}: {
  children: ReactNode
  commands?: CliCommand[]
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

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

  const items: SelectItem[] = useMemo(() => {
    return filterArray(
      commands.map((command) =>
        onFeature || !command.feature
          ? {
              label: join([command.name, command.description], ' - '),
              id: command.id,
              shortcut: command.shortcut,
            }
          : undefined
      )
    )
  }, [commands, onFeature])

  return (
    <GitRouter response={branchQuery}>
      {command ? (
        <Command command={cliCommands[command]}>{children}</Command>
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
