import React, { ReactNode } from 'react'
import FeatureRequireProvider from './FeatureRequireProvider'
import PullMutationProvider from './PullMutationProvider'

export default function FeaturePullProvider({
  children,
  arg,
}: {
  children: ReactNode
  arg?: string
}) {
  return (
    <FeatureRequireProvider>
      <PullMutationProvider arg={arg}>{children}</PullMutationProvider>
    </FeatureRequireProvider>
  )
}
