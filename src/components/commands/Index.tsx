import React from 'react'
import useGit from '../../hooks/useGit'
import { filterArray } from '../../lib/array'
import { isBranchFeature, parseBranch } from '../../lib/branch'
import BranchSelect from '../BranchSelect'
import Column from '../Column'
import GitBoundary from '../GitBoundary'
import Log from '../Log'
import LogText from '../LogText'

export default function Index() {
  const gitBranches = useGit(
    (git) =>
      git
        .branch()
        .then((result) =>
          filterArray(Object.values(result.branches ?? {}).map(parseBranch))
        ),
    { runWith: true }
  )

  const featureBranches = gitBranches.state.result?.filter(isBranchFeature)

  return (
    <GitBoundary name="git branches" state={gitBranches.state}>
      <Column gap={1}>
        <Log.Info><LogText.Default bold cyan>Feature Branches</LogText.Default></Log.Info>
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
