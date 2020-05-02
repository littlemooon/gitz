import React, { ReactNode, useCallback } from 'react'
import { Branch } from '../lib/branch'
import BranchMutationProvider from './BranchMutationProvider'
import StashProvider from './StashProvider'

export default function BranchProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const provider = useCallback(
    (stashCommitProps) => (
      <BranchMutationProvider branch={branch} {...stashCommitProps} />
    ),
    [branch]
  )

  return <StashProvider Provider={provider}>{children}</StashProvider>
}
