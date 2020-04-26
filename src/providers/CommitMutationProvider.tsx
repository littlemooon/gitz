import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { Commit } from '../lib/commit'
import { mutations } from '../lib/gitOperations'

export default function CommitMutationProvider({
  commit,
  children,
}: {
  commit?: Commit
  children: ReactNode
}) {
  const response = useGitMutation(mutations.commit, commit)

  return (
    <GitRouter response={response} config={{}}>
      {children}
    </GitRouter>
  )
}
