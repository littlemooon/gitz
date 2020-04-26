import { Box } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import LogText from '../components/LogText'
import Static from '../components/Static'
import BranchQueryProvider from '../providers/BranchQueryProvider'
import BranchSelectProvider from '../providers/BranchSelectProvider'
import FeatureCreateProvider from './FeatureCreateProvider'

export default function FeatureSelectProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchQueryProvider>
      {(branchQuery) =>
        branchQuery.state?.feature?.length ? (
          <BranchSelectProvider
            title="Switch feature branch"
            branches={branchQuery.state?.feature}
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
        )
      }
    </BranchQueryProvider>
  )
}
