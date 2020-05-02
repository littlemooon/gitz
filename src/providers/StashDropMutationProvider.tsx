import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'

export default function StashDropMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashQuery = useGitQuery(queries.stash, undefined)
  const stashDropMutation = useGitMutation(mutations.stashDrop, undefined)

  const shouldRun = stashQuery.state?.latest
  useInit(() => {
    if (shouldRun) {
      stashDropMutation.run()
    }
  })

  return (
    <GitRouter
      response={stashDropMutation}
      config={{ [GitStatus.initial]: () => (shouldRun ? null : children) }}
    >
      {children}
    </GitRouter>
  )
}
