import React, { useCallback, useEffect, useState } from 'react'
import useGit from '../../hooks/useGit'
import { BranchFeature, createBranchFeature } from '../../lib/branch'
import Form, { FormData, FormField } from '../Form'
import GitBoundary from '../GitBoundary'
import Log from '../Log'
import LogText from '../LogText'

export interface BranchFeatureCreateForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function BranchFeatureCreate() {
  const [branch, setBranch] = useState<BranchFeature>()
  const { state, run } = useGit((git, { name }: BranchFeature) =>
    git.checkoutBranch(name, 'master')
  )

  useEffect(() => {
    if (branch) run(branch)
  }, [branch, run])

  const onSubmit = useCallback((newForm: BranchFeatureCreateForm) => {
    setBranch(
      createBranchFeature({
        issueId: newForm.issueId.value,
        description: newForm.description.value,
      })
    )
  }, [])

  return branch ? (
    <GitBoundary name={`Creating branch: ${branch.name}`} state={state}>
      <Log.Success exit>
        <LogText.Success>Branch created: {branch.name}</LogText.Success>
      </Log.Success>
    </GitBoundary>
  ) : (
    <Log.Info>
      <Form<BranchFeatureCreateForm>
        label="Create a new feature branch"
        initialData={{
          issueId: { label: 'Issue ID' },
          description: { label: 'Branch Description' },
        }}
        onSubmit={onSubmit}
      />
    </Log.Info>
  )
}
