import React, { ReactNode } from 'react'
import FeatureRequireProvider from './FeatureRequireProvider'
import PushMutationProvider from './PushMutationProvider'

export default function FeaturePushProvider({
  children,
  arg,
}: {
  children: ReactNode
  arg?: string
}) {
  return (
    <FeatureRequireProvider>
      <PushMutationProvider arg={arg}>{children}</PushMutationProvider>
    </FeatureRequireProvider>
  )
}
