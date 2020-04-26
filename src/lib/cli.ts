import meow, { BooleanFlag, Result } from 'meow'
import { CliCommand, cliCommands } from './command'
import env from './env'

export const cliHelpText = `
Usage:
  gitz                      index of commands
  gitz status               (s) current branch status
  gitz branch <name?>       (b) create new feature branch
  gitz checkout             (c) switch to feature branch
  gitz commit <message?>    (m) commit with issueId
  gitz update               (u) rebase current branch onto ${env.masterBranch}

Options:
  --help        Show this screen
  --version     Show version
  -d --debug    Run with debug logs
`

export type CliInputFlags = {
  debug: BooleanFlag
}

export type CliInput = Result<CliInputFlags>

export type CliFlags = {
  debug?: boolean
}

export interface Cli {
  command?: CliCommand
  args: string[]
  flags: {
    debug?: boolean
  }
  showHelp(exitCode?: number): void
  showVersion(): void
}

function parseCommand(command?: string): CliCommand | undefined {
  if (command) {
    const c = Object.values(cliCommands).find(
      ({ name, shortcut }) => command === name || command === shortcut
    )
    if (c) {
      return c
    } else {
      throw new Error(
        `Unknown command: ${command} [${Object.keys(cliCommands).join(', ')}]`
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
  flags: {
    debug: { type: 'boolean', default: false, alias: 'd' },
  },
})

const cli = parseCliInput(cliInput)

export default cli
