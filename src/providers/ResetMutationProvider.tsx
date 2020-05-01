import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { mutations } from '../lib/mutations'

export default function ResetMutationProvider({
  children,
  paths,
}: {
  children: ReactNode
  paths: string | string[]
}) {
  const resetMutation = useGitMutation(mutations.reset, paths)

  return <GitRouter response={resetMutation}>{children}</GitRouter>
}
