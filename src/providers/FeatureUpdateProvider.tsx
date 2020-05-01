import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useFirst from '../hooks/useFirst'
import useGitQuery from '../hooks/useGitQuery'
import env from '../lib/env'
import { queries } from '../lib/queries'
import CheckoutMutationProvider from './CheckoutMutationProvider'
import FeatureRequireProvider from './FeatureRequireProvider'
import PullMutationProvider from './PullMutationProvider'
import RebaseMutationProvider from './RebaseMutationProvider'

export default function FeatureUpdateProvider({
  children,
}: {
  children: ReactNode
}) {
  const branchQuery = useGitQuery(queries.branch, undefined)
  const originalBranch = useFirst(() => branchQuery.state?.current)

  const masterBranch = branchQuery.state?.all.find(
    (x) => x.name === env.masterBranch
  )

  return (
    <GitRouter response={branchQuery}>
      <FeatureRequireProvider branch={originalBranch}>
        <CheckoutMutationProvider branch={masterBranch}>
          <PullMutationProvider branch={masterBranch}>
            <CheckoutMutationProvider branch={originalBranch}>
              <RebaseMutationProvider branch={masterBranch}>
                <PullMutationProvider branch={originalBranch}>
                  {children}
                </PullMutationProvider>
              </RebaseMutationProvider>
            </CheckoutMutationProvider>
          </PullMutationProvider>
        </CheckoutMutationProvider>
      </FeatureRequireProvider>
    </GitRouter>
  )
}
