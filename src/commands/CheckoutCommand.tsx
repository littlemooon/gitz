import React from 'react'
import BranchSelect from '../components/BranchSelect'
import Column from '../components/Column'
import GitBoundary from '../components/GitBoundary'
import LogText from '../components/LogText'
import Title from '../components/Title'
import { isFeatureBranch } from '../lib/branch'
import { useGitBranches } from '../providers/GitBranchProvider'

export default function CheckoutCommand() {
  const gitBranches = useGitBranches()
  const featureBranches = gitBranches.branches.filter(isFeatureBranch)

  return (
    <GitBoundary name="git branch" state={gitBranches}>
      <Column>
        <Title>Switch to feature branch</Title>
        {featureBranches?.length ? (
          <BranchSelect
            branches={featureBranches}
            formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
          />
        ) : (
          <LogText.Warn>No feature branches found</LogText.Warn>
        )}
      </Column>
    </GitBoundary>
  )
}
