import React from 'react'
import BranchSelect from '../components/BranchSelect'
import Column from '../components/Column'
import GitBoundary from '../components/GitBoundary'
import LogText from '../components/LogText'
import Title from '../components/Title'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/git'

export default function CheckoutCommand() {
  const branches = useGitQuery(queries.branch, undefined)

  return (
    <GitBoundary response={branches}>
      <Column>
        <Title>Switch to feature branch</Title>
        {branches.state?.feature?.length ? (
          <BranchSelect
            branches={branches.state?.feature}
            formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
          />
        ) : (
          <LogText.Warn>No feature branches found</LogText.Warn>
        )}
      </Column>
    </GitBoundary>
  )
}
