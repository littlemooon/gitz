import React, { ReactNode } from 'react'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/queries'
import FeatureRequireProvider from './FeatureRequireProvider'
import PullMutationProvider from './PullMutationProvider'

export default function FeaturePullProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <FeatureRequireProvider>
      <PullMutationProvider branch={branchQuery.state?.current}>
        {children}
      </PullMutationProvider>
    </FeatureRequireProvider>
  )
}
