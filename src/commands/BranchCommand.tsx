import React, { useCallback, useEffect, useState } from 'react'
import Column from '../components/Column'
import Exit from '../components/Exit'
import Form, { FormData, FormField } from '../components/Form'
import GitBoundary from '../components/GitBoundary'
import LogText from '../components/LogText'
import Row from '../components/Row'
import Title from '../components/Title'
import useGit, { GitStatus } from '../hooks/useGit'
import { BranchFeature, createFeatureBranch } from '../lib/branch'
import env from '../lib/env'
import FocusProvider from '../providers/FocusProvider'

export interface BranchCommandForm extends FormData {
  issueId: FormField
  description: FormField
}

export default function BranchCommand() {
  const [branch, setBranch] = useState<BranchFeature>()
  const gitCheckoutBranch = useGit((git, { name }: BranchFeature) =>
    git.checkoutBranch(name, env.masterBranch)
  )

  useEffect(() => {
    if (branch && gitCheckoutBranch.state.status === GitStatus.initial) {
      gitCheckoutBranch.run(branch)
    }
  }, [branch, gitCheckoutBranch])

  const onSubmit = useCallback((newForm: BranchCommandForm) => {
    setBranch(
      createFeatureBranch({
        issueId: newForm.issueId.value,
        description: newForm.description.value,
      })
    )
  }, [])

  return (
    <Column>
      <Title>Create a new feature branch</Title>
      <FocusProvider focus={!branch}>
        <Form<BranchCommandForm>
          initialData={{
            issueId: { label: 'Issue ID' },
            description: { label: 'Branch Description' },
          }}
          onSubmit={onSubmit}
        />
      </FocusProvider>
      <GitBoundary
        name={`Creating branch: ${branch?.name}`}
        state={gitCheckoutBranch.state}
      >
        <Row gap={1}>
          <LogText.Success>Branch created:</LogText.Success>
          <LogText.Default>{branch?.name}</LogText.Default>
        </Row>
        <Exit />
      </GitBoundary>
    </Column>
  )
}
