import React from 'react'
import BranchSelect from '../components/BranchSelect'
import BranchStatus from '../components/BranchStatus'
import Column from '../components/Column'
import LogText from '../components/LogText'
import GitBranchProvider from '../providers/GitBranchProvider'

export default function CheckoutCommand() {
  return (
    <GitBranchProvider>
      {(branchQuery) => (
        <Column gap={1}>
          <BranchStatus />

          {branchQuery.state?.feature?.length ? (
            <BranchSelect
              title="Switch feature branch"
              branches={branchQuery.state?.feature}
              formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
            />
          ) : (
            <LogText.Warn>No feature branches found</LogText.Warn>
          )}
        </Column>
      )}
    </GitBranchProvider>
  )
}
