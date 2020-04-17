import React from 'react'
import Column from '../components/Column'
import Exit from '../components/Exit'
import { FormData, FormField } from '../components/Form'
import GitBoundary from '../components/GitBoundary'
import LogText from '../components/LogText'
import Row from '../components/Row'
import useGitQuery from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import env from '../lib/env'
import { queries } from '../lib/git'

export interface CommitCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function CommitCommand() {
  const branches = useGitQuery(queries.branch, undefined)
  const isFeature = isFeatureBranch(branches.state?.current)

  return (
    <GitBoundary response={branches}>
      {isFeature ? (
        <Row gap={1}>
          <LogText.Success>Current branch:</LogText.Success>
          <LogText.Default>{branches.state?.current?.name}</LogText.Default>
          <Exit />
        </Row>
      ) : (
        <Column gap={1}>
          <LogText.Error>Must be on a feature branch to commit</LogText.Error>
          <LogText.Default>
            {branches.state?.current?.name} is not of form{' '}
            {env.featureBranchRegex.toString()}
          </LogText.Default>
        </Column>
      )}
    </GitBoundary>
  )
}
