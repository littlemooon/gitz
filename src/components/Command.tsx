import React, { ReactNode } from 'react'
import CommandSelect from '../components/CommandSelect'
import { CliCommand, CliCommandKey, cliCommands } from '../lib/command'
import BranchStatusProvider from '../providers/BranchStatusProvider'
import FeatureCommitProvider from '../providers/FeatureCommitProvider'
import FeatureCreateProvider from '../providers/FeatureCreateProvider'
import FeatureSelectProvider from '../providers/FeatureSelectProvider'
import FeatureUpdateProvider from '../providers/FeatureUpdateProvider'
import FileStatusProvider from '../providers/FileStatusProvider'
import StashApplyMutationProvider from '../providers/StashApplyMutationProvider'
import StashDropMutationProvider from '../providers/StashDropMutationProvider'
import StashPushMutationProvider from '../providers/StashPushMutationProvider'
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
      return (
        <StashStatusProvider>
          <CommandSelect
            commands={[
              cliCommands[CliCommandKey.STASH_PUSH],
              cliCommands[CliCommandKey.STASH_APPLY],
              cliCommands[CliCommandKey.STASH_DROP],
            ]}
          >
            {children}
          </CommandSelect>
        </StashStatusProvider>
      )

    case CliCommandKey.STASH_PUSH:
      return <StashPushMutationProvider>{children}</StashPushMutationProvider>

    case CliCommandKey.STASH_APPLY:
      return <StashApplyMutationProvider>{children}</StashApplyMutationProvider>

    case CliCommandKey.STASH_DROP:
      return <StashDropMutationProvider>{children}</StashDropMutationProvider>

    default:
      return (
        <BranchStatusProvider>
          <CommandSelect>{children}</CommandSelect>
        </BranchStatusProvider>
      )
  }
}
