import React from 'react'
import BranchSelect from '../components/BranchSelect'
import Column from '../components/Column'
import GitBoundary from '../components/GitBoundary'
import Log from '../components/Log'
import LogText from '../components/LogText'
import Title from '../components/Title'
import { isFeatureBranch } from '../lib/branch'
import { useGitBranches } from '../providers/GitBranchProvider'

export default function IndexCommand() {
  const gitBranches = useGitBranches()
  const featureBranches = gitBranches.branches.filter(isFeatureBranch)

  return (
    <GitBoundary name="git branch" state={gitBranches}>
      <Column gap={1}>
        <Log.Info>
          <Title cyan>Feature Branches</Title>
        </Log.Info>
        {featureBranches?.length ? (
          <BranchSelect
            branches={featureBranches}
            formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
          />
        ) : (
            <Log.Info>
              <LogText.Info>No feature branches found</LogText.Info>
            </Log.Info>
          )}
      </Column>
    </GitBoundary>
  )
}
