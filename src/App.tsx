import React from 'react'
import Commands from './Commands'
import ErrorBoundary from './components/ErrorBoundary'
import CliProvider from './providers/CliProvider'
import GitBranchProvider from './providers/GitBranchProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <CliProvider>
        <GitBranchProvider>
          <Commands />
        </GitBranchProvider>
      </CliProvider>
    </ErrorBoundary>
  )
}
