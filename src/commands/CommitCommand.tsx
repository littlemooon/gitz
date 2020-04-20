import React, { useCallback, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import { Static } from '../components/Static'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import { Commit, commitForm, CommitForm, createCommit } from '../lib/commit'
import { mutations } from '../lib/git'
import GitBranchProvider from '../providers/GitBranchProvider'
import { Maybe } from '../types'
import CheckoutCommand from './CheckoutCommand'

export default function CommitCommand() {
  const { setError } = useError()
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
    <GitBranchProvider>
      {(branchQuery) =>
        isFeatureBranch(branchQuery.state?.current) ? (
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
                        value: branchQuery.state?.current?.issueId,
                      },
                    }}
                    onSubmit={onSubmit}
                  />
                )
              },
            }}
          />
        ) : (
          <Column>
            <Static>
              <LogText.Error prefix={commitMutation.name.prefix}>
                Must be on a feature branch to commit
              </LogText.Error>
            </Static>
            <CheckoutCommand />
          </Column>
        )
      }
    </GitBranchProvider>
  )
}
