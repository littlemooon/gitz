import React, { useCallback, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form, { FormData, FormField } from '../components/Form'
import LogText from '../components/LogText'
import Router from '../components/Router'
import Title from '../components/Title'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import { BranchFeature, createFeatureBranch } from '../lib/branch'
import { mutations } from '../lib/git'
import FocusProvider from '../providers/FocusProvider'

export interface BranchCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function BranchCommand() {
  const { setError } = useError()
  const [branch, setBranch] = useState<BranchFeature>()

  const response = useGitMutation(mutations.checkoutBranch, branch)

  const onSubmit = useCallback(
    (newForm: BranchCommandForm) => {
      try {
        setBranch(
          createFeatureBranch({
            issueId: newForm.issueId.value,
            description: newForm.description.value,
          })
        )
      } catch (error) {
        setError(error)
      }
    },
    [setError]
  )

  return (
    <Router
      path={response.status}
      config={{
        [GitStatus.initial]: (
          <Column>
            <Title>Create a new feature branch</Title>
            <FocusProvider focus={!branch}>
              <Form<BranchCommandForm>
                initialData={{
                  issueId: { label: 'Issue ID' },
                  description: { label: 'Branch Description' },
                }}
                onSubmit={onSubmit}
              />
            </FocusProvider>
          </Column>
        ),
        [GitStatus.loading]: (
          <LogText.Loading>{`Creating branch: ${branch?.name}`}</LogText.Loading>
        ),
        [GitStatus.success]: (
          <LogText.Success prefix={'Switched to new branch:'} exit>
            {branch?.name}
          </LogText.Success>
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
