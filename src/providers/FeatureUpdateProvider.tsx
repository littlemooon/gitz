import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/queries'
import FeatureRequireProvider from './FeatureRequireProvider'
import PullMutationProvider from './PullMutationProvider'

export default function FeatureUpdateProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <GitRouter response={branchQuery}>
      <FeatureRequireProvider>
        <PullMutationProvider branch={branchQuery.state?.master}>
          {children}
        </PullMutationProvider>
      </FeatureRequireProvider>
    </GitRouter>
  )
}
