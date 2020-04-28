import React, { ReactNode } from 'react'
import CommandSelect from '../components/CommandSelect'
import { CliCommand, CliCommandKey, cliCommands } from '../lib/command'
import BranchStatusProvider from '../providers/BranchStatusProvider'
import CommitCreateProvider from '../providers/CommitCreateProvider'
import FeatureCreateProvider from '../providers/FeatureCreateProvider'
import FeatureSelectProvider from '../providers/FeatureSelectProvider'
import FeatureUpdateProvider from '../providers/FeatureUpdateProvider'
import FileStatusProvider from '../providers/FileStatusProvider'

export default function Command({
  command,
  children,
}: {
  command?: CliCommand
  children: ReactNode
}) {
  switch (command?.id) {
    case CliCommandKey.STATUS:
      return (
        <BranchStatusProvider>
          <FileStatusProvider>{children}</FileStatusProvider>
        </BranchStatusProvider>
      )

    case CliCommandKey.BRANCH:
      return <FeatureCreateProvider>{children}</FeatureCreateProvider>

    case CliCommandKey.CHECKOUT:
      return <FeatureSelectProvider>{children}</FeatureSelectProvider>

    case CliCommandKey.COMMIT:
      return <CommitCreateProvider>{children}</CommitCreateProvider>

    case CliCommandKey.UPDATE:
      return <FeatureUpdateProvider>{children}</FeatureUpdateProvider>

    default:
      return (
        <BranchStatusProvider>
          <CommandSelect commands={Object.values(cliCommands)}>
            {children}
          </CommandSelect>
        </BranchStatusProvider>
      )
  }
}
