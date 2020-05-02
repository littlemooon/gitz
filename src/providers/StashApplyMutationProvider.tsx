import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'

export default function StashApplyMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashQuery = useGitQuery(queries.stash, undefined)
  const stashApplyMutation = useGitMutation(mutations.stashApply, undefined)

  const shouldRun = stashQuery.state?.latest
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
