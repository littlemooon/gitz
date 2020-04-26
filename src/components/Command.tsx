import React, { ReactNode } from 'react'
import CommandSelect from '../components/CommandSelect'
import { CliCommand, CliCommandKey, cliCommands } from '../lib/command'
import CommitCreateProvider from '../providers/CommitCreateProvider'
import FeatureCreateProvider from '../providers/FeatureCreateProvider'
import FeatureSelectProvider from '../providers/FeatureSelectProvider'
import FileStatusProvider from '../providers/FileStatusProvider'
import UpdateMasterProvider from '../providers/UpdateMasterProvider'

export default function Command({
  command,
  children,
}: {
  command?: CliCommand
  children: ReactNode
}) {
  switch (command?.id) {
    case CliCommandKey.STATUS:
      return <FileStatusProvider>{children}</FileStatusProvider>

    case CliCommandKey.BRANCH:
      return <FeatureCreateProvider>{children}</FeatureCreateProvider>

    case CliCommandKey.CHECKOUT:
      return <FeatureSelectProvider>{children}</FeatureSelectProvider>

    case CliCommandKey.COMMIT:
      return <CommitCreateProvider>{children}</CommitCreateProvider>

    case CliCommandKey.UPDATE:
      return <UpdateMasterProvider>{children}</UpdateMasterProvider>

    default:
      return (
        <CommandSelect commands={Object.values(cliCommands)}>
          {children}
        </CommandSelect>
      )
  }
}
