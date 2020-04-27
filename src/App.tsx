import React from 'react'
import Command from './components/Command'
import ErrorBoundary from './components/ErrorBoundary'
import Exit from './components/Exit'
import CliProvider from './providers/CliProvider'
import StaticProvider from './providers/StaticProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <StaticProvider>
        <CliProvider>
          {(cli) => (
            <Command command={cli.command}>
              <Exit />
            </Command>
          )}
        </CliProvider>
      </StaticProvider>
    </ErrorBoundary>
  )
}
