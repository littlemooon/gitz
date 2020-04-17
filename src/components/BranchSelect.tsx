import React, { useCallback, useMemo, useState } from 'react'
import useGitMutation from '../hooks/useGitMutation'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/git'
import Exit from './Exit'
import GitBoundary from './GitBoundary'
import LogText from './LogText'
import Row from './Row'
import Select, { SelectItem } from './Select'

export default function BranchSelect<B extends Branch>({
  branches,
  formatLabel,
}: {
  branches: B[]
  formatLabel?: (branch: B) => string
}) {
  const [branch, setBranch] = useState<B | undefined>()

  const checkout = useGitMutation(mutations.checkout, branch)

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

  return branch ? (
    <GitBoundary response={checkout}>
      <Row gap={1}>
        <LogText.Success>Switched to</LogText.Success>
        <LogText.Default>{branch.name}</LogText.Default>
      </Row>
      <Exit />
    </GitBoundary>
  ) : (
    <Select onSelect={handleSelect} items={items} />
  )
}
