import React from 'react'
import BranchSelect from '../components/BranchSelect'
import LogText from '../components/LogText'
import Router from '../components/Router'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/git'

export default function CheckoutCommand() {
  const response = useGitQuery(queries.branch, undefined)

  return (
    <Router
      path={response.status}
      config={{
        [GitStatus.initial]: null,
        [GitStatus.loading]: <LogText.Loading>{response.name}</LogText.Loading>,
        [GitStatus.success]: response.state?.feature?.length ? (
          <BranchSelect
            title="Switch to feature branch"
            branches={response.state?.feature}
            formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
          />
        ) : (
          <LogText.Warn>No feature branches found</LogText.Warn>
        ),
        [GitStatus.error]: (
          <LogText.Error prefix={response.name} exit>
            {response.error?.message}
          </LogText.Error>
        ),
      }}
    />
  )
}
