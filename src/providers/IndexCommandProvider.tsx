import React, { ReactNode } from 'react'
import BranchStatusProvider from './BranchStatusProvider'
import CommandSelectProvider from './CommandSelectProvider'
import FileStatusProvider from './FileStatusProvider'

export default function IndexCommandProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchStatusProvider>
      <FileStatusProvider>
        <CommandSelectProvider>{children}</CommandSelectProvider>
      </FileStatusProvider>
    </BranchStatusProvider>
  )
}
