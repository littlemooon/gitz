import React, { useCallback, useMemo, useState } from 'react'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/git'
import Column from './Column'
import LogText from './LogText'
import Router from './Router'
import Select, { SelectItem } from './Select'
import { Static } from './Static'
import Title from './Title'

export default function BranchSelect<B extends Branch>({
  title,
  branches,
  formatLabel,
}: {
  title?: string
  branches: B[]
  formatLabel?: (branch: B) => string
}) {
  const [branch, setBranch] = useState<B | undefined>()

  const response = useGitMutation(mutations.checkout, branch)

  const handleSelect = useCallback(
    (item: SelectItem) => {
      const branch = branches.find((x) => x.name === item.id)
      if (branch) {
        setBranch(branch)
      }
    },
    [branches, setBranch]
  )

  const items: SelectItem[] = useMemo(() => {
    return (
      branches.map((branch) => ({
        label: formatLabel
          ? formatLabel(branch)
          : `${branch.name}: ${branch.label}`,
        id: branch.name,
        current: branch.current,
      })) ?? []
    )
  }, [branches, formatLabel])

  return (
    <Router
      path={response.status}
      config={{
        [GitStatus.initial]: (
          <Column>
            <Title>{title ?? 'Switch to branch'}</Title>
            <Select onSelect={handleSelect} items={items} />
          </Column>
        ),
        [GitStatus.loading]: <LogText.Loading>{response.name}</LogText.Loading>,
        [GitStatus.success]: (
          <LogText.Success prefix="Switched to:" exit>
            {branch?.name}
          </LogText.Success>
        ),
        [GitStatus.error]: (
          <Column>
            <Static>
              <LogText.Error prefix={response.name}>
                {response.error?.message}
              </LogText.Error>
            </Static>
            <Title>{title ?? 'Switch to branch'}</Title>
            <Select onSelect={handleSelect} items={items} />
          </Column>
        ),
      }}
    />
  )
}
