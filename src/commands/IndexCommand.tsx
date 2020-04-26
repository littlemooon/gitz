import React from 'react'
import BranchStatus from '../components/BranchStatus'
import Column from '../components/Column'
import CommandSelect from '../components/CommandSelect'
import { CliCommandKey, cliCommands } from '../lib/cli'

export default function IndexCommand() {
  return (
    <Column>
      <BranchStatus />

      <CommandSelect
        commands={Object.values(cliCommands).filter(
          (x) => x.id !== CliCommandKey.INDEX
        )}
      />
    </Column>
  )
}
