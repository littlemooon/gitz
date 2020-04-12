import React from 'react'
import Cli from './Cli'
import Commands from './Commands'
import ErrorBoundary from './ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Cli>
        <Commands />
      </Cli>
    </ErrorBoundary>
  )
}
