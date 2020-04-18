import React, { useEffect } from 'react'
import Column from '../components/Column'
import { FormData, FormField } from '../components/Form'
import LogText from '../components/LogText'
import Router, { useRoute } from '../components/Router'
import { Static } from '../components/Static'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import { CliCommand } from '../lib/cli'
import { queries } from '../lib/git'
import CheckoutCommand from './CheckoutCommand'

export interface CommitCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function CommitCommand() {
  const route = useRoute()
  const response = useGitQuery(queries.branch, undefined)
  const isFeature = isFeatureBranch(response.state?.current)

  useEffect(() => {
    if (response.state?.current && !isFeature) {
      route.setPath(CliCommand.CHECKOUT)
    }
  }, [isFeature, response.state, route])

  return (
    <Router
      path={response.status}
      config={{
        [GitStatus.initial]: null,
        [GitStatus.loading]: <LogText.Loading>{response.name}</LogText.Loading>,
        [GitStatus.success]: isFeature ? (
          <LogText.Success prefix="Current branch:" exit>
            {response.state?.current?.name}
          </LogText.Success>
        ) : (
          <Column gap={1}>
            <Static>
              <LogText.Error>
                Must be on a feature branch to commit
              </LogText.Error>
            </Static>
            <CheckoutCommand />
          </Column>
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
