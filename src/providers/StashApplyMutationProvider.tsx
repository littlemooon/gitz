import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'
import { Stash } from '../lib/stash'

export default function StashApplyMutationProvider({
  children,
  stash,
  run = true,
}: {
  children: ReactNode
  stash?: Stash
  run?: boolean
}) {
  const stashQuery = useGitQuery(queries.stash, undefined)
  const stashApplyMutation = useGitMutation(mutations.stashApply, undefined)

  const shouldRun =
    run &&
    (stash
      ? stashQuery.state?.latest?.hash === stash.hash
      : stashQuery.state?.latest)

  useInit(() => {
    if (shouldRun) {
      stashApplyMutation.run()
    }
  })

  return (
    <GitRouter
      response={stashApplyMutation}
      config={{ [GitStatus.initial]: () => (shouldRun ? null : children) }}
    >
      {children}
    </GitRouter>
  )
}
