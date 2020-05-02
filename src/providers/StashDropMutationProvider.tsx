import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useFirst from '../hooks/useFirst'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'
import { Stash } from '../lib/stash'

export default function StashDropMutationProvider({
  children,
  stash,
  run = true,
}: {
  children: ReactNode
  stash?: Stash
  run?: boolean
}) {
  const stashQuery = useGitQuery(queries.stash, undefined)
  const stashDropMutation = useGitMutation(mutations.stashDrop, undefined)

  const shouldRun = useFirst(
    () =>
      run &&
      (stash
        ? stashQuery.state?.latest?.hash === stash.hash
        : stashQuery.state?.latest)
  )

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
