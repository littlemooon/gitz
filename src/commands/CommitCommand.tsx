import React, { useCallback, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import { Static } from '../components/Static'
import Title from '../components/Title'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import { Commit, commitForm, CommitForm, createCommit } from '../lib/commit'
import { mutations, queries } from '../lib/git'
import { Maybe } from '../types'
import CheckoutCommand from './CheckoutCommand'

export default function CommitCommand() {
  const { setError } = useError()
  const branchQuery = useGitQuery(queries.branch, undefined)
  const current = branchQuery.state?.current
  const isFeature = isFeatureBranch(current)

  const [commit, setCommit] = useState<Maybe<Commit>>()
  const commitMutation = useGitMutation(mutations.commit, commit)

  const onSubmit = useCallback(
    (form: CommitForm) => {
      try {
        setCommit(createCommit(form))
      } catch (error) {
        setError(error)
      }
    },
    [setError]
  )

  return (
    <GitRouter
      response={branchQuery}
      config={{
        [GitStatus.initial]: function CommitBranchInitial() {
          return (
            <Static>
              <Title>Commit</Title>
            </Static>
          )
        },
        [GitStatus.success]: function CommitBranchSuccess() {
          return isFeature ? (
            <GitRouter
              response={commitMutation}
              config={{
                [GitStatus.initial]: function CommitInitial() {
                  return (
                    <Form<CommitForm>
                      fields={{
                        ...commitForm,
                        issueId: {
                          ...commitForm.issueId,
                          value: current?.issueId,
                        },
                      }}
                      onSubmit={onSubmit}
                    />
                  )
                },
              }}
            />
          ) : (
            <Column gap={1}>
              <Static>
                <LogText.Error prefix={commitMutation.name.prefix}>
                  Must be on a feature branch to commit
                </LogText.Error>
              </Static>
              <CheckoutCommand />
            </Column>
          )
        },
      }}
    />
  )
}
