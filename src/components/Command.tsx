import React, { ReactNode } from 'react'
import { CliCommand, CliCommandKey } from '../lib/command'
import env from '../lib/env'
import AddMutationProvider from '../providers/AddMutationProvider'
import AddSelectProvider from '../providers/AddSelectProvider'
import BranchStatusProvider from '../providers/BranchStatusProvider'
import CommandSelectProvider from '../providers/CommandSelectProvider'
import FeatureCommitProvider from '../providers/FeatureCommitProvider'
import FeatureCreateProvider from '../providers/FeatureCreateProvider'
import FeaturePushProvider from '../providers/FeaturePushProvider'
import FeatureSelectProvider from '../providers/FeatureSelectProvider'
import FeatureUpdateProvider from '../providers/FeatureUpdateProvider'
import FileStatusProvider from '../providers/FileStatusProvider'
import ResetMutationProvider from '../providers/ResetMutationProvider'
import ResetSelectProvider from '../providers/ResetSelectProvider'
import StashApplyMutationProvider from '../providers/StashApplyMutationProvider'
import StashDropMutationProvider from '../providers/StashDropMutationProvider'
import StashPutMutationProvider from '../providers/StashPutMutationProvider'
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
      return <FeatureCommitProvider>{children}</FeatureCommitProvider>

    case CliCommandKey.update:
      return <FeatureUpdateProvider>{children}</FeatureUpdateProvider>

    case CliCommandKey.push:
      return <FeaturePushProvider arg="HEAD">{children}</FeaturePushProvider>

    case CliCommandKey.pushOrigin:
      return <FeaturePushProvider arg="HEAD">{children}</FeaturePushProvider>

    case CliCommandKey.pushOriginMaster:
      return (
        <FeaturePushProvider arg={`HEAD:${env.masterBranch}`}>
          {children}
        </FeaturePushProvider>
      )

    case CliCommandKey.add:
      return <AddSelectProvider>{children}</AddSelectProvider>

    case CliCommandKey.addAll:
      return <AddMutationProvider paths=".">{children}</AddMutationProvider>

    case CliCommandKey.reset:
      return <ResetSelectProvider>{children}</ResetSelectProvider>

    case CliCommandKey.resetAll:
      return <ResetMutationProvider paths=".">{children}</ResetMutationProvider>

    case CliCommandKey.stash:
      return (
        <CommandSelectProvider
          keys={[
            CliCommandKey.stashPut,
            CliCommandKey.stashApply,
            CliCommandKey.stashDrop,
          ]}
        >
          {children}
        </CommandSelectProvider>
      )

    case CliCommandKey.stashPut:
      return <StashPutMutationProvider>{children}</StashPutMutationProvider>

    case CliCommandKey.stashApply:
      return <StashApplyMutationProvider>{children}</StashApplyMutationProvider>

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
