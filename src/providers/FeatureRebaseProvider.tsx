import React, { ReactNode } from 'react'
import FeatureRequireProvider from './FeatureRequireProvider'
import RebaseMutationProvider from './RebaseMutationProvider'

export default function FeatureRebaseProvider({
  children,
  arg,
}: {
  children: ReactNode
  arg?: string
}) {
  return (
    <FeatureRequireProvider>
      <RebaseMutationProvider arg={arg}>{children}</RebaseMutationProvider>
    </FeatureRequireProvider>
  )
}
