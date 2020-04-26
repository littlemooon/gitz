import React, { ReactNode } from 'react'
import BranchCommand from './commands/BranchCommand'
import CheckoutCommand from './commands/CheckoutCommand'
import CommitCommand from './commands/CommitCommand'
import IndexCommand from './commands/IndexCommand'
import StatusCommand from './commands/StatusCommand'
import ErrorBoundary from './components/ErrorBoundary'
import Router from './components/Router'
import { CliCommandKey } from './lib/cli'
import CliProvider from './providers/CliProvider'
import StaticProvider from './providers/StaticProvider'

const commandRouteConfig: Record<CliCommandKey, ReactNode> = {
  [CliCommandKey.INDEX]: <IndexCommand />,
  [CliCommandKey.STATUS]: <StatusCommand />,
  [CliCommandKey.BRANCH]: <BranchCommand />,
  [CliCommandKey.CHECKOUT]: <CheckoutCommand />,
  [CliCommandKey.COMMIT]: <CommitCommand />,
}

export default function App() {
  return (
    <ErrorBoundary>
      <StaticProvider>
        <CliProvider>
          {(cli) => (
            <Router path={cli.command?.id} config={commandRouteConfig} />
          )}
        </CliProvider>
      </StaticProvider>
    </ErrorBoundary>
  )
}
