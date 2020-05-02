import React, { createContext, ReactNode } from 'react'
import Column from '../components/Column'
import GitRouter from '../components/GitRouter'
import StashStatus from '../components/StashStatus'
import Table from '../components/Table'
import Title from '../components/Title'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/queries'

export const StashStatusContext = createContext(false)

export default function StashStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashQuery = useGitQuery(queries.stash, undefined)

  return (
    <GitRouter response={stashQuery}>
      <StashStatusContext.Provider value={true}>
        <Column paddingTop={1}>
          <Column>
            <Title>Stash</Title>
            <Table.Info
              data={{
                items: (
                  <Column>
                    {stashQuery.state?.all.map((stash) => (
                      <StashStatus key={stash.hash} stash={stash} />
                    ))}
                  </Column>
                ),
              }}
            />
          </Column>

          {children}
        </Column>
      </StashStatusContext.Provider>
    </GitRouter>
  )
}
