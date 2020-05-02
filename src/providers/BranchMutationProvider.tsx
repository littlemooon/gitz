import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import Warning from '../components/Warning'
import useGitMutation from '../hooks/useGitMutation'
import useGitQuery, { GitStatus } from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { mutations } from '../lib/mutations'
import { queries } from '../lib/queries'
import FeatureCreateProvider from './FeatureCreateProvider'

export default function BranchMutationProvider({
  branch,
  children,
}: {
  branch?: Branch
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const hasBranch =
    branch && branchQuery.state?.all.find((x) => x.name === branch.name)

  const checkoutBranchMutation = useGitMutation(
    mutations.checkoutBranch,
    hasBranch ? undefined : branch
  )

  return (
    <GitRouter
      response={checkoutBranchMutation}
      config={{
        [GitStatus.initial]: function BranchMutationIgnore() {
          return hasBranch ? (
            <Warning text="Branch already exists" content={[branch?.name]}>
              <FeatureCreateProvider>{children}</FeatureCreateProvider>
            </Warning>
          ) : null
        },
      }}
    >
      {children}
    </GitRouter>
  )
}
