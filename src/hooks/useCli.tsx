import { BooleanFlag, Result } from 'meow'
import React, { createContext, ReactNode, useContext } from 'react'
import Json from '../components/Json'
import { Debug } from '../components/Log'
import { DebugTable } from '../components/Table'

export interface ICli {
  command?: CliCommand
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

export enum CliCommand {
  'STATUS' = 'status',
}

export type CliInputFlags = {
  debug: BooleanFlag
}

export type CliInput = Result<CliInputFlags>

export type CliFlags = {
  debug?: boolean
}

export const CliContext = createContext<ICli>({
  command: undefined,
  args: [],
  flags: {},
  showHelp() {
    throw new Error('InputContext has not been initialised')
  },
  showVersion() {
    throw new Error('InputContext has not been initialised')
  },
})

const commandMap: Record<string, CliCommand> = {
  status: CliCommand.STATUS,
  st: CliCommand.STATUS,
}

function parseCommand(command?: string): CliCommand | undefined {
  if (command) {
    const c = commandMap[command]
    if (c) {
      return c
    } else {
      throw new Error(
        `Unknown command: ${command} [${Object.keys(commandMap).join(', ')}]`
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

export function CliProvider({
  cliInput,
  children,
}: {
  cliInput: CliInput
  children: ReactNode
}) {
  const cli = parseCliInput(cliInput)

  return (
    <CliContext.Provider value={cli}>
      <Debug name="input">
        <DebugTable
          data={{
            command: cli.command ?? 'undefined',
            args: <Json>{cli.args}</Json>,
            flags: <Json>{cli.flags}</Json>,
          }}
        />
      </Debug>
      {children}
    </CliContext.Provider>
  )
}

export default function useCli() {
  return useContext(CliContext)
}
