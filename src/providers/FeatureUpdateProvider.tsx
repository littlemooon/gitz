import React, { ReactNode } from 'react'
import env from '../lib/env'
import BranchQueryProvider from './BranchQueryProvider'
import CheckoutMutationProvider from './CheckoutMutationProvider'
import PullMutationProvider from './PullMutationProvider'
import RebaseMutationProvider from './RebaseMutationProvider'

export default function FeatureUpdateProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BranchQueryProvider>
      {(branchQuery) => {
        const masterBranch = branchQuery.state?.all.find(
          (x) => x.name === env.masterBranch
        )

        return (
          <CheckoutMutationProvider branch={masterBranch}>
            <PullMutationProvider branch={masterBranch}>
              <CheckoutMutationProvider branch={branchQuery.state?.current}>
                <RebaseMutationProvider branch={masterBranch}>
                  <PullMutationProvider>{children}</PullMutationProvider>
                </RebaseMutationProvider>
              </CheckoutMutationProvider>
            </PullMutationProvider>
          </CheckoutMutationProvider>
        )
      }}
    </BranchQueryProvider>
  )
}
