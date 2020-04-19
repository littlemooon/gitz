import React from 'react'
import BranchSelect from '../components/BranchSelect'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { queries } from '../lib/git'

export default function CheckoutCommand() {
  const response = useGitQuery(queries.branch, undefined)

  return (
    <GitRouter
      response={response}
      config={{
        [GitStatus.success]: function CheckoutSuccess() {
          return response.state?.feature?.length ? (
            <BranchSelect
              title="Switch feature branch"
              branches={response.state?.feature}
              formatLabel={(x) => `${x.issueId}: ${x.description} (${x.label})`}
            />
          ) : (
            <LogText.Warn>No feature branches found</LogText.Warn>
          )
        },
      }}
    />
  )
}
