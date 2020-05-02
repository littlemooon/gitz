import React, { ReactNode } from 'react'
import BranchStatusProvider from './BranchStatusProvider'
import FileStatusProvider from './FileStatusProvider'

export default function QueryStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchStatusProvider>
      <FileStatusProvider>{children}</FileStatusProvider>
    </BranchStatusProvider>
  )
}
