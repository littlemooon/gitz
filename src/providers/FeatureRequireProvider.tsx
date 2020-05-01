import { Box } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import CommandSelect from '../components/CommandSelect'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Static from '../components/Static'
import useGitQuery from '../hooks/useGitQuery'
import { Branch, isFeatureBranch } from '../lib/branch'
import { cliCommands } from '../lib/command'
import { queries } from '../lib/queries'

export default function FeatureRequireProvider({
  children,
  branch,
}: {
  children: ReactNode
  branch?: Branch
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)

  return (
    <GitRouter response={branchQuery}>
      {isFeatureBranch(branch ?? branchQuery.state?.current) ? (
        <>{children}</>
      ) : (
        <Column>
          <Static id="FeatureRequire">
            <Box paddingBottom={1}>
              <LogText.Warn prefix="Must be on a feature branch" />
            </Box>
          </Static>

          <CommandSelect commands={[cliCommands.branch, cliCommands.checkout]}>
            {children}
          </CommandSelect>
        </Column>
      )}
    </GitRouter>
  )
}
