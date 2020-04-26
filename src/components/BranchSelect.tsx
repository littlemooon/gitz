import React, { useCallback, useMemo, useState } from 'react'
import CommitCommand from '../commands/CommitCommand'
import useGitMutation from '../hooks/useGitMutation'
import { GitStatus } from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/gitOperations'
import Column from './Column'
import GitRouter from './GitRouter'
import Select, { SelectItem } from './Select'
import Static from './Static'
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
    <GitRouter
      response={response}
      config={{
        [GitStatus.initial]: function BranchSelectInitial() {
          return (
            <Column>
              <Title>{title ?? response.name.prefix}</Title>
              <Select onSelect={handleSelect} items={items} />
            </Column>
          )
        },
        [GitStatus.error]: function BranchSelectError(errorMessage) {
          return (
            <Column>
              <Static id="BranchSelect.Error">{errorMessage}</Static>
              <CommitCommand />
            </Column>
          )
        },
      }}
    />
  )
}
