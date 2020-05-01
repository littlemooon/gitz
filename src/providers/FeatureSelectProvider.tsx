import { Box } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Static from '../components/Static'
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
        <Column>
          <Static id="FeatureSelectProvider.none">
            <Box paddingBottom={1}>
              <LogText.Warn prefix="No feature branches found" />
            </Box>
          </Static>

          <FeatureCreateProvider>{children}</FeatureCreateProvider>
        </Column>
      )}
    </GitRouter>
  )
}
