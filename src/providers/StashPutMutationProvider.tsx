import React, { ReactNode, useEffect } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import useInit from '../hooks/useInit'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'
import { Stash } from '../lib/stash'

export default function StashPutMutationProvider({
  children,
  setStash,
}: {
  children: ReactNode
  setStash?: (x: Stash) => void
}) {
  const statusQuery = useGitQuery(queries.status, undefined)
  const stashQuery = useGitQuery(queries.stash, undefined)

  const stashPutMutation = useGitMutation(mutations.stashPut, undefined)

  const shouldRun = statusQuery.state?.hasStagedChanges

  useInit(() => {
    if (shouldRun) {
      stashPutMutation.run()
    }
  })

  useEffect(() => {
    if (
      stashPutMutation.status === GitStatus.success &&
      stashQuery.state?.latest &&
      setStash
    ) {
      setStash(stashQuery.state?.latest)
    }
  }, [stashQuery, stashPutMutation, setStash])

  return (
    <GitRouter
      response={stashPutMutation}
      config={{ [GitStatus.initial]: () => (shouldRun ? null : children) }}
    >
      {children}
    </GitRouter>
  )
}
