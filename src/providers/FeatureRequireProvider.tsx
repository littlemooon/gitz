import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import Warning from '../components/Warning'
import useGitQuery from '../hooks/useGitQuery'
import { Branch, isFeatureBranch } from '../lib/branch'
import { CliCommandKey } from '../lib/command'
import { queries } from '../lib/queries'
import CommandSelectProvider from '../providers/CommandSelectProvider'

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
      {branch ? (
        isFeatureBranch(branch)
      ) : branchQuery.state?.onFeature ? (
        <>{children}</>
      ) : (
        <Warning title="Must be on a feature branch">
          <CommandSelectProvider
            keys={[CliCommandKey.checkout, CliCommandKey.branch]}
          >
            {children}
          </CommandSelectProvider>
        </Warning>
      )}
    </GitRouter>
  )
}
