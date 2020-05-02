import React, { ReactNode } from 'react'
import Column from '../components/Column'
import GitRouter from '../components/GitRouter'
import LogText from '../components/LogText'
import Row from '../components/Row'
import useGitQuery from '../hooks/useGitQuery'
import { queries } from '../lib/queries'
import { join } from '../lib/string'

export default function StashStatusProvider({
  children,
}: {
  children: ReactNode
}) {
  const stashQuery = useGitQuery(queries.stash, undefined)

  return (
    <GitRouter response={stashQuery}>
      <Column>
        <Column paddingTop={1} paddingBottom={1}>
          {stashQuery.state?.all.length ? (
            stashQuery.state?.all.map((stash) => (
              <Row gap={1} key={stash.hash}>
                <LogText.Default>
                  {new Date(stash.date).toLocaleDateString()}
                </LogText.Default>
                <LogText.Default magenta>
                  {new Date(stash.date).toLocaleTimeString()}
                </LogText.Default>

                <LogText.Default>
                  {join(
                    [stash.authorEmail ?? stash.authorName, stash.message],
                    ' '
                  )}
                </LogText.Default>
              </Row>
            ))
          ) : (
            <LogText.Warn prefix="No stashed items" />
          )}
        </Column>

        {children}
      </Column>
    </GitRouter>
  )
}
