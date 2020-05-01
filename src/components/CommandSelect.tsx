import { useApp } from 'ink'
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Command from '../components/Command'
import Select, { SelectItem } from '../components/Select'
import { CliCommand, CliCommandKey, cliCommands } from '../lib/command'

export default function CommandSelect({
  commands = Object.values(cliCommands),
  children,
}: {
  children: ReactNode
  commands?: CliCommand[]
}) {
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

  const items: SelectItem[] = useMemo(() => {
    const maxName = Math.max(
      ...Object.values(commands).map((x) => x.name.length)
    )

    return (
      commands.map((command) => ({
        label: `${command.name.padEnd(maxName)} (${command.shortcut}) ${
          command.description
        }`,
        id: command.id,
        shortcut: command.shortcut,
      })) ?? []
    )
  }, [commands])

  return command ? (
    <Command command={cliCommands[command]}>{children}</Command>
  ) : (
    <Select
      title="Commands"
      onSelect={handleSelect}
      items={[...items, { id: 'exit', label: 'exit', shortcut: 'x' }]}
    />
  )
}
