import React from 'react'
import Commands from './Commands'
import ErrorBoundary from './components/ErrorBoundary'
import CliProvider from './providers/CliProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <CliProvider>
        <Commands />
      </CliProvider>
    </ErrorBoundary>
  )
}
