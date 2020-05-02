import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import Warning from '../components/Warning'
import useCli from '../hooks/useCli'
import useGitQuery from '../hooks/useGitQuery'
import { CliCommandKey } from '../lib/command'
import {
  Commit,
  commitForm,
  CommitForm,
  createCommit,
  parseCommitArgs,
} from '../lib/commit'
import { queries } from '../lib/queries'
import CommitMutationProvider from '../providers/CommitMutationProvider'
import { Maybe } from '../types'
import FeatureRequireProvider from './FeatureRequireProvider'

export default function FeatureCommitProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const statusQuery = useGitQuery(queries.status, undefined)

  const { args } = useCli()
  const argValues = useMemo(() => parseCommitArgs(args), [args])

  const { setError } = useError()
  const [commit, setCommit] = useState<Maybe<Commit>>()
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
    <GitRouter response={branchQuery}>
      <GitRouter response={statusQuery}>
        <FeatureRequireProvider>
          {commit ? (
            <CommitMutationProvider commit={commit}>
              {children}
            </CommitMutationProvider>
          ) : statusQuery.state?.hasStagedChanges ? (
            <Form<CommitForm>
              title="Create commit message"
              fields={{
                ...commitForm,
                issueId: {
                  ...commitForm.issueId,
                  value:
                    argValues.issueId ?? branchQuery.state?.current?.issueId,
                },
                message: {
                  ...commitForm.message,
                  value: argValues.message,
                },
              }}
              onSubmit={onSubmit}
            />
          ) : (
            <Warning
              text="No staged files"
              commands={[CliCommandKey.add, CliCommandKey.addAll]}
            />
          )}
        </FeatureRequireProvider>
      </GitRouter>
    </GitRouter>
  )
}
