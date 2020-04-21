import React, { useCallback, useMemo, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import Table from '../components/Table'
import Title from '../components/Title'
import useCli from '../hooks/useCli'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import {
  BranchFeature,
  createFeatureBranch,
  featureBranchForm,
  FeatureBranchForm,
  parseBranchArgs,
} from '../lib/branch'
import { mutations } from '../lib/git'
import FocusProvider from '../providers/FocusProvider'
import GitBranchProvider from '../providers/GitBranchProvider'

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
    <GitBranchProvider>
      {(branchQuery) => (
        <GitRouter
          response={response}
          config={{
            [GitStatus.initial]: function BranchInitial() {
              const { args } = useCli()

              const initialValues = useMemo(() => parseBranchArgs(args), [args])

              return (
                <Column>
                  <Table.Debug name="branch command" data={initialValues} />
                  <Title>Create a new feature branch</Title>
                  <FocusProvider focus={!branch}>
                    <Form<FeatureBranchForm>
                      fields={{
                        ...featureBranchForm,
                        issueId: {
                          ...featureBranchForm.issueId,
                          value:
                            initialValues.issueId ??
                            branchQuery.state?.current.issueId,
                        },
                        description: {
                          ...featureBranchForm.description,
                          value: initialValues.description,
                        },
                      }}
                      onSubmit={onSubmit}
                    />
                  </FocusProvider>
                </Column>
              )
            },
          }}
        />
      )}
    </GitBranchProvider>
  )
}
