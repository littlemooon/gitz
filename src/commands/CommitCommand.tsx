import React from 'react'
import Column from '../components/Column'
import Exit from '../components/Exit'
import { FormData, FormField } from '../components/Form'
import LogText from '../components/LogText'
import Router from '../components/Router'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import env from '../lib/env'
import { queries } from '../lib/git'

export interface CommitCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function CommitCommand() {
  const response = useGitQuery(queries.branch, undefined)
  const isFeature = isFeatureBranch(response.state?.current)

  return (
    <Router
      path={response.status}
      config={{
        [GitStatus.initial]: null,
        [GitStatus.loading]: <LogText.Loading>{response.name}</LogText.Loading>,
        [GitStatus.success]: isFeature ? (
          <>
            <LogText.Success prefix="Current branch:">
              {response.state?.current?.name}
            </LogText.Success>
            <Exit />
          </>
        ) : (
          <Column gap={1}>
            <LogText.Error>Must be on a feature branch to commit</LogText.Error>
            <LogText.Default>
              {response.state?.current?.name} is not of form{' '}
              {env.featureBranchRegex.toString()}
            </LogText.Default>
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
