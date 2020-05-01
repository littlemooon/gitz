import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Select, { SelectItem } from '../components/Select'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'
import CheckoutProvider from '../providers/CheckoutProvider'

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
      branches
        .sort((a, b) => {
          if (a.lastCheckout === b.lastCheckout) {
            if (a.created === b.created) {
              return a.name > b.name ? 1 : -1
            } else {
              return a.created < b.created ? 1 : -1
            }
          } else {
            return a.lastCheckout < b.lastCheckout ? 1 : -1
          }
        })
        .map((branch) => ({
          label: formatLabel
            ? formatLabel(branch)
            : `${branch.name}: ${branch.label}`,
          id: branch.name,
          current: branch.current,
        })) ?? []
    )
  }, [branches, formatLabel])

  return branch ? (
    <CheckoutProvider branch={branch}>{children}</CheckoutProvider>
  ) : (
    <Select
      title={title ?? mutations.checkout.getName(branch).title}
      onSelect={handleSelect}
      items={items}
    />
  )
}
