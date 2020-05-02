import React, { ComponentType, ReactNode, useState } from 'react'
import useCli from '../hooks/useCli'
import { Stash } from '../lib/stash'
import StashApplyMutationProvider from './StashApplyMutationProvider'
import StashDropMutationProvider from './StashDropMutationProvider'
import StashPutMutationProvider from './StashPutMutationProvider'

export default function StashProvider({
  children,
  Provider,
}: {
  children: ReactNode
  Provider: ComponentType<{ children: ReactNode }>
}) {
  const [stash, setStash] = useState<Stash>()
  const { flags } = useCli()

  return flags.noStash ? (
    <>{children}</>
  ) : (
    <StashPutMutationProvider setStash={setStash}>
      <Provider>
        <StashApplyMutationProvider stash={stash} run={Boolean(stash)}>
          <StashDropMutationProvider stash={stash} run={Boolean(stash)}>
            {children}
          </StashDropMutationProvider>
        </StashApplyMutationProvider>
      </Provider>
    </StashPutMutationProvider>
  )
}
