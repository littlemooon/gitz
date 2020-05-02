import React, { ReactNode, useCallback } from 'react'
import { Branch } from '../lib/branch'
import CheckoutMutationProvider from './CheckoutMutationProvider'
import StashCommitProvider from './StashCommitProvider'

export default function CheckoutProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const provider = useCallback(
    (stashCommitProps) => (
      <CheckoutMutationProvider branch={branch} {...stashCommitProps} />
    ),
    [branch]
  )

  return (
    <StashCommitProvider Provider={provider}>{children}</StashCommitProvider>
  )
}
