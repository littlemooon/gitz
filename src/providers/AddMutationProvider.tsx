import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { mutations } from '../lib/mutations'

export default function AddMutationProvider({
  children,
  paths,
}: {
  children: ReactNode
  paths: string | string[]
}) {
  const addMutation = useGitMutation(mutations.add, paths)

  return <GitRouter response={addMutation}>{children}</GitRouter>
}
