import React from 'react'
import Column from './components/Column'
import Command from './components/Command'
import ErrorBoundary from './components/ErrorBoundary'
import Table from './components/Table'
import store from './lib/store'
import CliProvider from './providers/CliProvider'
import CommandSelectProvider from './providers/CommandSelectProvider'
import QueryStatusProvider from './providers/QueryStatusProvider'
import StaticProvider from './providers/StaticProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <StaticProvider>
        <CliProvider>
          {(cli) => (
            <Column>
              <Table.Debug name="store" data={{ path: store.path }} />
              <QueryStatusProvider>
                <Command command={cli.command}>
                  <CommandSelectProvider />
                </Command>
              </QueryStatusProvider>
            </Column>
          )}
        </CliProvider>
      </StaticProvider>
    </ErrorBoundary>
  )
}
