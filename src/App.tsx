import React from 'react'
import Command from './components/Command'
import ErrorBoundary from './components/ErrorBoundary'
import Exit from './components/Exit'
import BranchStatusProvider from './providers/BranchStatusProvider'
import CliProvider from './providers/CliProvider'
import StaticProvider from './providers/StaticProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <StaticProvider>
        <CliProvider>
          {(cli) => (
            <BranchStatusProvider>
              <Command command={cli.command}>
                <Exit />
              </Command>
            </BranchStatusProvider>
          )}
        </CliProvider>
      </StaticProvider>
    </ErrorBoundary>
  )
}
