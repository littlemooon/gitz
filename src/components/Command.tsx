import React, { ReactNode } from 'react'
import { CliCommand, CliCommandKey } from '../lib/command'
import AddMutationProvider from '../providers/AddMutationProvider'
import AddSelectProvider from '../providers/AddSelectProvider'
import BranchStatusProvider from '../providers/BranchStatusProvider'
import CommandSelectProvider from '../providers/CommandSelectProvider'
import FeatureCommitProvider from '../providers/FeatureCommitProvider'
import FeatureCreateProvider from '../providers/FeatureCreateProvider'
import FeaturePullProvider from '../providers/FeaturePullProvider'
import FeaturePushProvider from '../providers/FeaturePushProvider'
import FeatureSelectProvider from '../providers/FeatureSelectProvider'
import FeatureUpdateProvider from '../providers/FeatureUpdateProvider'
import FileStatusProvider from '../providers/FileStatusProvider'
import ResetMutationProvider from '../providers/ResetMutationProvider'
import ResetSelectProvider from '../providers/ResetSelectProvider'
import StashApplyMutationProvider from '../providers/StashApplyMutationProvider'
import StashDropMutationProvider from '../providers/StashDropMutationProvider'
import StashPutMutationProvider from '../providers/StashPutMutationProvider'
import StashStatusProvider from '../providers/StashStatusProvider'
import UnknownCommandProvider from '../providers/UnknownCommandProvider'

export default function Command({
  command,
  children,
}: {
  command?: CliCommand
  children: ReactNode
}) {
  switch (command?.key) {
    case CliCommandKey.status:
      return (
        <BranchStatusProvider>
          <FileStatusProvider>{children}</FileStatusProvider>
        </BranchStatusProvider>
      )

    case CliCommandKey.branch:
      return <FeatureCreateProvider>{children}</FeatureCreateProvider>

    case CliCommandKey.checkout:
      return <FeatureSelectProvider>{children}</FeatureSelectProvider>

    case CliCommandKey.commit:
      return (
        <FeatureCommitProvider>
          <CommandSelectProvider keys={[CliCommandKey.update]}>
            {children}
          </CommandSelectProvider>
        </FeatureCommitProvider>
      )

    case CliCommandKey.update:
      return (
        <FeatureUpdateProvider>
          <CommandSelectProvider
            keys={[CliCommandKey.pull, CliCommandKey.push]}
          >
            {children}
          </CommandSelectProvider>
        </FeatureUpdateProvider>
      )

    case CliCommandKey.pull:
      return (
        <FeaturePullProvider>
          <CommandSelectProvider keys={[CliCommandKey.push]}>
            {children}
          </CommandSelectProvider>
        </FeaturePullProvider>
      )

    case CliCommandKey.push:
      return <FeaturePushProvider>{children}</FeaturePushProvider>

    case CliCommandKey.add:
      return (
        <AddSelectProvider>
          <CommandSelectProvider keys={[CliCommandKey.commit]}>
            {children}
          </CommandSelectProvider>
        </AddSelectProvider>
      )

    case CliCommandKey.addAll:
      return (
        <AddMutationProvider paths=".">
          <CommandSelectProvider keys={[CliCommandKey.commit]}>
            {children}
          </CommandSelectProvider>
        </AddMutationProvider>
      )

    case CliCommandKey.reset:
      return (
        <ResetSelectProvider>
          <CommandSelectProvider keys={[CliCommandKey.commit]}>
            {children}
          </CommandSelectProvider>
        </ResetSelectProvider>
      )

    case CliCommandKey.resetAll:
      return (
        <ResetMutationProvider paths=".">
          <CommandSelectProvider keys={[CliCommandKey.commit]}>
            {children}
          </CommandSelectProvider>
        </ResetMutationProvider>
      )

    case CliCommandKey.stash:
      return (
        <StashStatusProvider>
          <CommandSelectProvider
            keys={[
              CliCommandKey.stashPut,
              CliCommandKey.stashApply,
              CliCommandKey.stashDrop,
            ]}
          >
            {children}
          </CommandSelectProvider>
        </StashStatusProvider>
      )

    case CliCommandKey.stashPut:
      return (
        <StashPutMutationProvider>
          <CommandSelectProvider keys={[CliCommandKey.checkout]}>
            {children}
          </CommandSelectProvider>
        </StashPutMutationProvider>
      )

    case CliCommandKey.stashApply:
      return (
        <StashApplyMutationProvider>
          <CommandSelectProvider keys={[CliCommandKey.stashDrop]}>
            {children}
          </CommandSelectProvider>
        </StashApplyMutationProvider>
      )

    case CliCommandKey.stashDrop:
      return <StashDropMutationProvider>{children}</StashDropMutationProvider>

    case CliCommandKey.unknown:
      return (
        <UnknownCommandProvider>
          <CommandSelectProvider>{children}</CommandSelectProvider>
        </UnknownCommandProvider>
      )

    default:
      return <CommandSelectProvider>{children}</CommandSelectProvider>
  }
}
