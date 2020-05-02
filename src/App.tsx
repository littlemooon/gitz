import React from 'react'
import Column from './components/Column'
import Command from './components/Command'
import ErrorBoundary from './components/ErrorBoundary'
import Exit from './components/Exit'
import Table from './components/Table'
import store from './lib/store'
import CliProvider from './providers/CliProvider'
import StaticProvider from './providers/StaticProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <StaticProvider>
        <CliProvider>
          {(cli) => (
            <Column>
              <Table.Debug name="store" data={{ path: store.path }} />
              <Command command={cli.command}>
                <Exit reason="finished" />
              </Command>
            </Column>
          )}
        </CliProvider>
      </StaticProvider>
    </ErrorBoundary>
  )
}
