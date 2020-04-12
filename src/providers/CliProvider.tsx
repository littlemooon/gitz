import meow, { BooleanFlag, Result } from 'meow'
import React, { ReactNode, useCallback, useState } from 'react'
import { Command, commandInputMap } from '../Commands'
import ErrorBoundary from '../components/ErrorBoundary'
import Json from '../components/Json'
import Table from '../components/Table'
import { CliContext, CliDispatchContext } from '../hooks/useCli'
import env from '../lib/env'

export type CliInputFlags = {
  debug: BooleanFlag
}

export type CliInput = Result<CliInputFlags>

export type CliFlags = {
  debug?: boolean
}

export interface ICli {
  command?: Command
  args: string[]
  flags: {
    debug?: boolean
  }
  /**
  Show the help text and exit with code.

  @param exitCode - The exit code to use. Default: `2`.
  */
  showHelp(exitCode?: number): void

  /**
  Show the version text and exit.
  */
  showVersion(): void
}

function parseCommand(command?: string): Command | undefined {
  if (command) {
    const c = commandInputMap[command]
    if (c) {
      return c
    } else {
      throw new Error(
        `Unknown command: ${command} [${Object.keys(commandInputMap).join(
          ', '
        )}]`
      )
    }
  }
}

function parseCliInput(cliInput: CliInput): ICli {
  const [command, ...args] = cliInput.input

  return {
    command: parseCommand(command),
    args,
    flags: cliInput.flags,
    showHelp: cliInput.showHelp,
    showVersion: cliInput.showVersion,
  }
}

export const cliHelpText = `
Usage
  $ gira

Options
  --name Your name

Examples
  $ gira --name=Jane
  Hello, Jane
`

const cliInput = meow<CliInputFlags>(cliHelpText, {
  flags: { debug: { type: 'boolean', default: false } },
})

export default function CliProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ICli>(parseCliInput(cliInput))

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

          {children}
        </CliDispatchContext.Provider>
      </ErrorBoundary>
    </CliContext.Provider>
  )
}
