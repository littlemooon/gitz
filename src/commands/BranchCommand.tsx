import React, { useCallback, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import Title from '../components/Title'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import {
  BranchFeature,
  createFeatureBranch,
  featureBranchForm,
  FeatureBranchForm,
} from '../lib/branch'
import { mutations } from '../lib/git'
import FocusProvider from '../providers/FocusProvider'

export default function BranchCommand() {
  const { setError } = useError()
  const [branch, setBranch] = useState<BranchFeature>()

  const response = useGitMutation(mutations.checkoutBranch, branch)

  const onSubmit = useCallback(
    (form: FeatureBranchForm) => {
      try {
        setBranch(createFeatureBranch(form))
      } catch (error) {
        setError(error)
      }
    },
    [setError]
  )

  return (
    <GitRouter
      response={response}
      config={{
        [GitStatus.initial]: function BranchInitial() {
          return (
            <Column>
              <Title>Create a new feature branch</Title>
              <FocusProvider focus={!branch}>
                <Form<FeatureBranchForm>
                  fields={featureBranchForm}
                  onSubmit={onSubmit}
                />
              </FocusProvider>
            </Column>
          )
        },
      }}
    />
  )
}
