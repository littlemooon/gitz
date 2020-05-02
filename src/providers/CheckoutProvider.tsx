import React, { ReactNode, useCallback } from 'react'
import { Branch } from '../lib/branch'
import CheckoutMutationProvider from './CheckoutMutationProvider'
import StashProvider from './StashProvider'

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

  return <StashProvider Provider={provider}>{children}</StashProvider>
}
