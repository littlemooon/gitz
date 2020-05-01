import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Column from '../components/Column'
import { useError } from '../components/ErrorBoundary'
import Form from '../components/Form'
import GitRouter from '../components/GitRouter'
import Table from '../components/Table'
import useCli from '../hooks/useCli'
import useGitQuery from '../hooks/useGitQuery'
import {
  createFeatureBranch,
  FeatureBranch,
  featureBranchForm,
  FeatureBranchForm,
  parseBranchArgs,
} from '../lib/branch'
import { queries } from '../lib/queries'
import BranchProvider from '../providers/BranchProvider'

export default function FeatureCreateProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const { setError } = useError()
  const [branch, setBranch] = useState<FeatureBranch>()

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

  const { args } = useCli()
  const argValues = useMemo(() => parseBranchArgs(args), [args])

  return (
    <GitRouter response={branchQuery}>
      {branch ? (
        <BranchProvider branch={branch}>{children}</BranchProvider>
      ) : (
        <Column>
          <Table.Debug name="branch command" data={argValues} />
          <Form<FeatureBranchForm>
            title="Create new feature branch"
            fields={{
              ...featureBranchForm,
              issueId: {
                ...featureBranchForm.issueId,
                value: argValues.issueId ?? branchQuery.state?.current?.issueId,
              },
              description: {
                ...featureBranchForm.description,
                value: argValues.description,
              },
            }}
            onSubmit={onSubmit}
          />
        </Column>
      )}
    </GitRouter>
  )
}
