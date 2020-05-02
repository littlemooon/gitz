import React, { ReactNode } from 'react'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/queries'
import FeatureRequireProvider from './FeatureRequireProvider'
import PushMutationProvider from './PushMutationProvider'

export default function FeaturePushProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <FeatureRequireProvider>
      <PushMutationProvider branch={branchQuery.state?.current}>
        {children}
      </PushMutationProvider>
    </FeatureRequireProvider>
  )
}
