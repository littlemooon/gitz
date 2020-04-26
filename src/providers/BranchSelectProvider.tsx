import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Select, { SelectItem } from '../components/Select'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/gitOperations'
import CheckoutMutationProvider from '../providers/CheckoutMutationProvider'

export default function BranchSelectProvider<B extends Branch>({
  title,
  branches,
  formatLabel,
  children,
}: {
  title?: string
  branches: B[]
  formatLabel?: (branch: B) => string
  children: ReactNode
}) {
  const [branch, setBranch] = useState<B | undefined>()

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
    <CheckoutMutationProvider branch={branch}>
      {children}
    </CheckoutMutationProvider>
  ) : (
    <Select
      title={title ?? mutations.checkout.getName(branch).prefix}
      onSelect={handleSelect}
      items={items}
    />
  )
}
