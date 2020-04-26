import React, { useCallback, useMemo, useState } from 'react'
import { RouteTo } from '../components/Router'
import Select, { SelectItem } from '../components/Select'
import { CliCommand, CliCommandKey } from '../lib/cli'

export default function CommandSelect({
  commands,
}: {
  commands: CliCommand[]
}) {
  const [command, setCommand] = useState<CliCommandKey | undefined>()

  const handleSelect = useCallback(
    (item: SelectItem) => {
      setCommand(item.id as CliCommandKey)
    },
    [setCommand]
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
      })) ?? []
    )
  }, [commands])

  return command ? (
    <RouteTo path={command} />
  ) : (
    <Select onSelect={handleSelect} items={items} />
  )
}
