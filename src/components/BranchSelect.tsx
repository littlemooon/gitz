import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useGit from '../hooks/useGit'
import { Branch } from '../lib/branch'
import GitBoundary from './GitBoundary'
import Log from './Log'
import LogText from './LogText'
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
  }, [branch])

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
  }, [branches])

  return branch ? (
    <GitBoundary name="git checkout" state={gitCheckout.state}>
      <Log.Success exit>
        <LogText.Success>Switched to</LogText.Success>
        <LogText.Default>{branch.name}</LogText.Default>
      </Log.Success>
    </GitBoundary>
  ) : (
    <Select onSelect={handleSelect} items={items} />
  )
}
