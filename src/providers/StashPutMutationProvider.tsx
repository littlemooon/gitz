import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'

export default function StashPutMutationProvider({
  children,
}: {
  children: ReactNode
}) {
  const statusQuery = useGitQuery(queries.status, undefined)
  const stashPutMutation = useGitMutation(mutations.stashPut, undefined)

  const shouldRun = statusQuery.state?.hasStagedChanges

  useInit(() => {
    if (shouldRun) {
      stashPutMutation.run()
    }
  })

  return (
    <GitRouter
      response={stashPutMutation}
      config={{ [GitStatus.initial]: () => (shouldRun ? null : children) }}
    >
      {children}
    </GitRouter>
  )
}
