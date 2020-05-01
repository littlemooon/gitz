import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useFirst from '../hooks/useFirst'
import useGitQuery from '../hooks/useGitQuery'
import env from '../lib/env'
import { queries } from '../lib/queries'
import CheckoutProvider from './CheckoutProvider'
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
        <CheckoutProvider branch={masterBranch}>
          <PullMutationProvider branch={masterBranch}>
            <CheckoutProvider branch={originalBranch}>
              <RebaseMutationProvider branch={masterBranch}>
                <PullMutationProvider branch={originalBranch}>
                  {children}
                </PullMutationProvider>
              </RebaseMutationProvider>
            </CheckoutProvider>
          </PullMutationProvider>
        </CheckoutProvider>
      </FeatureRequireProvider>
    </GitRouter>
  )
}
