import React, { ComponentType, ReactNode, useState } from 'react'
import GitRouter from '../components/GitRouter'
import Select, { SelectItem } from '../components/Select'
import useCli from '../hooks/useCli'
import useGitQuery from '../hooks/useGitQuery'
import { Branch } from '../lib/branch'
import { queries } from '../lib/queries'
import FeatureCommitProvider from './FeatureCommitProvider'
import StashApplyMutationProvider from './StashApplyMutationProvider'
import StashDropMutationProvider from './StashDropMutationProvider'
import StashPushMutationProvider from './StashPushMutationProvider'

export default function StashCommitProvider({
  children,
  Provider,
}: {
  branch?: Branch
  children: ReactNode
  Provider: ComponentType<{ children?: ReactNode }>
}) {
  const { flags } = useCli()
  const [select, setSelect] = useState<SelectItem>()

  const branchQuery = useGitQuery(queries.branch, undefined)
  const statusQuery = useGitQuery(queries.status, undefined)

  const hasChanges = Boolean(statusQuery.state?.files.length)

  return (
    <GitRouter response={branchQuery}>
      <GitRouter response={statusQuery}>
        {hasChanges ? (
          select?.id === 'stash' || flags.noStash ? (
            <StashPushMutationProvider>
              <Provider>
                <StashApplyMutationProvider>
                  <StashDropMutationProvider>
                    {children}
                  </StashDropMutationProvider>
                </StashApplyMutationProvider>
              </Provider>
            </StashPushMutationProvider>
          ) : branchQuery.state?.onFeature && select?.id === 'commit' ? (
            <FeatureCommitProvider>
              <Provider>{children}</Provider>
            </FeatureCommitProvider>
          ) : (
            <Select
              items={[
                { id: 'stash', label: 'Stash changes', shortcut: 's' },
                { id: 'commit', label: 'Commit changes', shortcut: 'c' },
              ]}
              onSelect={setSelect}
            />
          )
        ) : (
          <Provider>{children}</Provider>
        )}
      </GitRouter>
    </GitRouter>
  )
}
