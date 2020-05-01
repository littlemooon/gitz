import React, { ReactNode } from 'react'
import CommandSelect from '../components/CommandSelect'
import { CliCommand, CliCommandKey, cliCommands } from '../lib/command'
import BranchStatusProvider from '../providers/BranchStatusProvider'
import FeatureCommitProvider from '../providers/FeatureCommitProvider'
import FeatureCreateProvider from '../providers/FeatureCreateProvider'
import FeatureSelectProvider from '../providers/FeatureSelectProvider'
import FeatureUpdateProvider from '../providers/FeatureUpdateProvider'
import FileStatusProvider from '../providers/FileStatusProvider'
import StashStatusProvider from '../providers/StashStatusProvider'

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
      return <FeatureCommitProvider>{children}</FeatureCommitProvider>

    case CliCommandKey.UPDATE:
      return <FeatureUpdateProvider>{children}</FeatureUpdateProvider>

    case CliCommandKey.STASH:
      return <StashStatusProvider>{children}</StashStatusProvider>

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
