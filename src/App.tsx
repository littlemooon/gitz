import React from 'react'
import BranchCommand from './commands/BranchCommand'
import CheckoutCommand from './commands/CheckoutCommand'
import CommitCommand from './commands/CommitCommand'
import HelpCommand from './commands/HelpCommand'
import IndexCommand from './commands/IndexCommand'
import StatusCommand from './commands/StatusCommand'
import ErrorBoundary from './components/ErrorBoundary'
import Router from './components/Router'
import { CliCommand } from './lib/cli'
import CliProvider from './providers/CliProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <CliProvider>
        {(cli) => (
          <Router
            path={cli.command}
            config={{
              [CliCommand.INDEX]: <IndexCommand />,
              [CliCommand.STATUS]: <StatusCommand />,
              [CliCommand.BRANCH]: <BranchCommand />,
              [CliCommand.CHECKOUT]: <CheckoutCommand />,
              [CliCommand.COMMIT]: <CommitCommand />,
              [CliCommand.HELP]: <HelpCommand />,
            }}
          />
        )}
      </CliProvider>
    </ErrorBoundary>
  )
}
