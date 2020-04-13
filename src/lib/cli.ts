import meow, { BooleanFlag, Result } from 'meow'
import { Command, commandInputMap } from '../Commands'

export const cliHelpText = `
Usage
  $ gitet

Options
  --name Your name

Examples
  $ gitet --name=Jane
  Hello, Jane
`

export type CliInputFlags = {
  debug: BooleanFlag
}

export type CliInput = Result<CliInputFlags>

export type CliFlags = {
  debug?: boolean
}

export interface Cli {
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

function parseCliInput(cliInput: CliInput): Cli {
  const [command, ...args] = cliInput.input

  return {
    command: parseCommand(command),
    args,
    flags: cliInput.flags,
    showHelp: cliInput.showHelp,
    showVersion: cliInput.showVersion,
  }
}

const cliInput = meow<CliInputFlags>(cliHelpText, {
  flags: { debug: { type: 'boolean', default: false, alias: 'd' } },
})

const cli = parseCliInput(cliInput)

export default cli
