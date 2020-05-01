import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import Warning from '../components/Warning'
import useGitQuery from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import { queries } from '../lib/queries'
import BranchSelectProvider from '../providers/BranchSelectProvider'
import FeatureCreateProvider from './FeatureCreateProvider'

export default function FeatureSelectProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <GitRouter response={branchQuery}>
      {branchQuery.state?.all.filter(isFeatureBranch)?.length ? (
        <BranchSelectProvider
          title="Switch feature branch"
          branches={branchQuery.state?.all.filter(isFeatureBranch)}
          formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
        >
          {children}
        </BranchSelectProvider>
      ) : (
        <Warning title="No feature branches found">
          <FeatureCreateProvider>{children}</FeatureCreateProvider>
        </Warning>
      )}
    </GitRouter>
  )
}
