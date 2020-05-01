import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useGitMutation from '../hooks/useGitMutation'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'

export default function CheckoutMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const checkoutMutation = useGitMutation(mutations.checkout, branch)

  return <GitRouter response={checkoutMutation}>{children}</GitRouter>
}
