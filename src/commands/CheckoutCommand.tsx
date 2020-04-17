import React from 'react'
import BranchSelect from '../components/BranchSelect'
import Column from '../components/Column'
import LogText from '../components/LogText'
import Router from '../components/Router'
import Title from '../components/Title'
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
        [GitStatus.success]: (
          <Column>
            <Title>Switch to feature branch</Title>
            {response.state?.feature?.length ? (
              <BranchSelect
                branches={response.state?.feature}
                formatLabel={(x) =>
                  `${x.issueId}: ${x.description} (${x.label})`
                }
              />
            ) : (
              <LogText.Warn>No feature branches found</LogText.Warn>
            )}
          </Column>
        ),
        [GitStatus.error]: (
          <LogText.Error prefix={response.error?.name}>
            {response.error?.message}
          </LogText.Error>
        ),
      }}
    />
  )
}
