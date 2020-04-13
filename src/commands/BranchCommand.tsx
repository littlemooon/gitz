import React, { useCallback, useEffect, useState } from 'react'
import Form, { FormData, FormField } from '../components/Form'
import GitBoundary from '../components/GitBoundary'
import Log from '../components/Log'
import LogText from '../components/LogText'
import useGit from '../hooks/useGit'
import { BranchFeature, createFeatureBranch } from '../lib/branch'
import env from '../lib/env'

export interface BranchCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function BranchCommand() {
  const [branch, setBranch] = useState<BranchFeature>()
  const { state, run } = useGit((git, { name }: BranchFeature) =>
    git.checkoutBranch(name, env.masterBranch)
  )

  useEffect(() => {
    if (branch) run(branch)
  }, [branch, run])

  const onSubmit = useCallback((newForm: BranchCommandForm) => {
    setBranch(
      createFeatureBranch({
        issueId: newForm.issueId.value,
        description: newForm.description.value,
      })
    )
  }, [])

  return branch ? (
    <GitBoundary name={`Creating branch: ${branch.name}`} state={state}>
      <Log.Success exit>
        <LogText.Success>Branch created:</LogText.Success>
        <LogText.Default>{branch.name}</LogText.Default>
      </Log.Success>
    </GitBoundary>
  ) : (
    <Log.Info>
      <Form<BranchCommandForm>
        title="Create a new feature branch"
        initialData={{
          issueId: { label: 'Issue ID' },
          description: { label: 'Branch Description' },
        }}
        onSubmit={onSubmit}
      />
    </Log.Info>
  )
}
