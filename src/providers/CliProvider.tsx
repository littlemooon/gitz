import React, { ReactNode, useCallback, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (state.flags.help) state.showHelp(0)
    if (state.flags.version) state.showVersion()
  }, [state])

  return state.flags.help || state.flags.version ? null : (
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
              command: <Json>{state.command}</Json>,
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
