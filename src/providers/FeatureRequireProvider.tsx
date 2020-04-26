import { Box } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import CommandSelect from '../components/CommandSelect'
import LogText from '../components/LogText'
import Static from '../components/Static'
import { isFeatureBranch } from '../lib/branch'
import { cliCommands } from '../lib/command'
import BranchQueryProvider from './BranchQueryProvider'

export default function FeatureRequireProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchQueryProvider>
      {(branchQuery) =>
        isFeatureBranch(branchQuery.state?.current) ? (
          <>{children}</>
        ) : (
          <Column>
            <Static id="FeatureRequire">
              <Box paddingBottom={1}>
                <LogText.Warn prefix="Must be on a feature branch" />
              </Box>
            </Static>

            <CommandSelect
              commands={[cliCommands.branch, cliCommands.checkout]}
            >
              {children}
            </CommandSelect>
          </Column>
        )
      }
    </BranchQueryProvider>
  )
}
