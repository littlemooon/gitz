import React from 'react'
import BranchSelect from '../components/BranchSelect'
import Column from '../components/Column'
import GitBoundary from '../components/GitBoundary'
import Log from '../components/Log'
import LogText from '../components/LogText'
import Title from '../components/Title'
import { isFeatureBranch } from '../lib/branch'
import { useGitBranches } from '../providers/GitBranchProvider'

export default function CheckoutCommand() {
  const gitBranches = useGitBranches()
  const featureBranches = gitBranches.branches.filter(isFeatureBranch)

  return (
    <GitBoundary name="git branch" state={gitBranches}>
      <Column gap={1}>
        <Log.Info>
          <Title cyan>Switch to feature branch</Title>
        </Log.Info>
        {featureBranches?.length ? (
          <BranchSelect
            branches={featureBranches}
            formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
          />
        ) : (
          <Log.Warn>
            <LogText.Warn>No feature branches found</LogText.Warn>
          </Log.Warn>
        )}
      </Column>
    </GitBoundary>
  )
}
