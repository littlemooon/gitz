import React, { ReactNode } from 'react'
import GitRouter from '../components/GitRouter'
import useFirst from '../hooks/useFirst'
import useGitQuery from '../hooks/useGitQuery'
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

  return (
    <GitRouter response={branchQuery}>
      <FeatureRequireProvider branch={originalBranch}>
        <CheckoutProvider branch={branchQuery.state?.master}>
          <PullMutationProvider arg={branchQuery.state?.master?.name}>
            <CheckoutProvider branch={originalBranch}>
              <RebaseMutationProvider
                arg={`origin/${branchQuery.state?.master?.name}`}
              >
                <PullMutationProvider arg={originalBranch?.name}>
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
