import React, { useCallback, useState } from 'react'
import Column from '../components/Column'
import { RouteTo } from '../components/Router'
import Select, { SelectItem } from '../components/Select'
import { CliCommand } from '../lib/cli'
import StatusCommand from './StatusCommand'

export default function IndexCommand() {
  const [command, setCommand] = useState<CliCommand | undefined>()

  const handleSelect = useCallback(
    (item: SelectItem) => {
      setCommand(item.id as CliCommand)
    },
    [setCommand]
  )

  return (
    <Column>
      <StatusCommand />

      {command ? (
        <RouteTo path={command} />
      ) : (
        <Select
          onSelect={handleSelect}
          items={[
            {
              id: CliCommand.BRANCH,
              label: 'branch      (b - create new feature branch)',
            },
            {
              id: CliCommand.CHECKOUT,
              label: 'checkout    (c - switch to feature branch)',
            },
            {
              id: CliCommand.COMMIT,
              label: 'commit      (m - commit with issueId)',
            },
          ]}
        />
      )}
    </Column>
  )
}
