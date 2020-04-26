import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import useCli from '../hooks/useCli'
import {
  Commit,
  commitForm,
  CommitForm,
  createCommit,
  parseCommitArgs,
} from '../lib/commit'
import BranchQueryProvider from '../providers/BranchQueryProvider'
import CommitMutationProvider from '../providers/CommitMutationProvider'
import { Maybe } from '../types'
import FeatureRequireProvider from './FeatureRequireProvider'

export default function CommitCreateProvider({
  children,
}: {
  children: ReactNode
}) {
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

  const { args } = useCli()

  const intialValues = useMemo(() => parseCommitArgs(args), [args])

  return (
    <BranchQueryProvider>
      {(branchQuery) => (
        <FeatureRequireProvider>
          {commit ? (
            <CommitMutationProvider commit={commit}>
              {children}
            </CommitMutationProvider>
          ) : (
            <Form<CommitForm>
              title="Create commit message"
              fields={{
                ...commitForm,
                issueId: {
                  ...commitForm.issueId,
                  value:
                    intialValues.issueId ?? branchQuery.state?.current.issueId,
                },
                message: {
                  ...commitForm.message,
                  value: intialValues.message,
                },
              }}
              onSubmit={onSubmit}
            />
          )}
        </FeatureRequireProvider>
      )}
    </BranchQueryProvider>
  )
}
