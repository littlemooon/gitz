import React, { ReactNode, useCallback, useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import Json from '../components/Json'
import Table from '../components/Table'
import { CliContext, CliDispatchContext } from '../hooks/useCli'
import cli, { Cli } from '../lib/cli'
import env from '../lib/env'

export default function CliProvider({
  children,
}: {
  children: (cli: Cli) => ReactNode
}) {
  const [state, setState] = useState<Cli>(cli)

  const setCli = useCallback(({ command, flags, args }) => {
    setState((state) => ({
      ...state,
      command: command ?? state.command,
      args: args ?? state.args,
      flags: flags ?? state.flags,
    }))
  }, [])

  return (
    <CliContext.Provider value={state}>
      <ErrorBoundary>
        <CliDispatchContext.Provider value={setCli}>
          <Table.Debug
            name="env"
            data={Object.entries(env).reduce(
              (acc, [key, value]) => ({ ...acc, [key]: value.toString() }),
              {}
            )}
          />
          <Table.Debug
            name="cli input"
            data={{
              command: state.command ?? 'index',
              args: <Json>{state.args}</Json>,
              flags: <Json>{state.flags}</Json>,
            }}
          />

          {children(cli)}
        </CliDispatchContext.Provider>
      </ErrorBoundary>
    </CliContext.Provider>
  )
}
