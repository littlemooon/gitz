import React, { useCallback, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Exit from '../components/Exit'
import Form, { FormData, FormField } from '../components/Form'
import GitBoundary from '../components/GitBoundary'
import LogText from '../components/LogText'
import Row from '../components/Row'
import Title from '../components/Title'
import useGitMutation from '../hooks/useGitMutation'
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

  const checkout = useGitMutation(mutations.checkoutBranch, branch)

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

      <GitBoundary
        loadingText={`Creating branch: ${branch?.name}`}
        response={checkout}
      >
        <Row gap={1}>
          <LogText.Success>Switched to new branch:</LogText.Success>
          <LogText.Default>{branch?.name}</LogText.Default>
        </Row>
        <Exit />
      </GitBoundary>
    </Column>
  )
}
