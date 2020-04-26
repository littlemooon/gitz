import React, { useCallback, useMemo, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Panels from '../components/Panels'
import Static from '../components/Static'
import useCli from '../hooks/useCli'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import { isFeatureBranch } from '../lib/branch'
import {
  Commit,
  commitForm,
  CommitForm,
  createCommit,
  parseCommitArgs,
} from '../lib/commit'
import { mutations } from '../lib/gitOperations'
import GitBranchProvider from '../providers/GitBranchProvider'
import { Maybe } from '../types'
import BranchCommand from './BranchCommand'
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
                const { args } = useCli()

                const intialValues = useMemo(() => parseCommitArgs(args), [
                  args,
                ])

                return (
                  <Form<CommitForm>
                    title="Create commit message"
                    fields={{
                      ...commitForm,
                      issueId: {
                        ...commitForm.issueId,
                        value:
                          intialValues.issueId ??
                          branchQuery.state?.current.issueId,
                      },
                      message: {
                        ...commitForm.message,
                        value: intialValues.message,
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
            <Static id="CommitCommand.Warn">
              <LogText.Warn prefix={commitMutation.name.prefix}>
                Must be on a feature branch to commit
              </LogText.Warn>
            </Static>

            <Panels
              items={[
                { id: 'branch', content: <BranchCommand /> },
                {
                  id: 'checkout',
                  content: <CheckoutCommand />,
                },
              ]}
            />
          </Column>
        )
      }
    </GitBranchProvider>
  )
}
