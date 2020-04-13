import React from 'react'
import Column from '../components/Column'
import Exit from '../components/Exit'
import { FormData, FormField } from '../components/Form'
import GitBoundary from '../components/GitBoundary'
import LogText from '../components/LogText'
import Row from '../components/Row'
import { isFeatureBranch } from '../lib/branch'
import env from '../lib/env'
import { useGitBranches } from '../providers/GitBranchProvider'

export interface CommitCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function CommitCommand() {
  const gitBranches = useGitBranches()
  const isFeature = isFeatureBranch(gitBranches.current)

  return (
    <GitBoundary name="git branch" state={gitBranches}>
      {isFeature ? (
        <Row>
          <LogText.Success>Current branch:</LogText.Success>
          <LogText.Default>{gitBranches.current?.name}</LogText.Default>
          <Exit />
        </Row>
      ) : (
        <Column>
          <LogText.Error>Must be on a feature branch to commit</LogText.Error>
          <LogText.Default>
            {gitBranches.current?.name} is not of form{' '}
            {env.featureBranchRegex.toString()}
          </LogText.Default>
        </Column>
      )}
    </GitBoundary>
  )
}
