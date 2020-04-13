import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useGit from '../hooks/useGit'
import { Branch } from '../lib/branch'
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

  const gitCheckout = useGit((git, branch: B) => git.checkout(branch.name))

  useEffect(() => {
    if (branch) {
      gitCheckout.run(branch)
    }
  }, [branch, gitCheckout])

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
    <GitBoundary name="git checkout" state={gitCheckout.state}>
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
