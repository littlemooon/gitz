import React, { ReactNode } from 'react'
import BranchStatusProvider from './BranchStatusProvider'
import FileStatusProvider from './FileStatusProvider'
import StashStatusProvider from './StashStatusProvider'

export default function QueryStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchStatusProvider>
      <FileStatusProvider>
        <StashStatusProvider>{children}</StashStatusProvider>
      </FileStatusProvider>
    </BranchStatusProvider>
  )
}
