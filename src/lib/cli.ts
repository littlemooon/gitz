import meow, { BooleanFlag, Result, StringFlag } from 'meow'
import { CliCommand, cliCommands } from './command'
import env from './env'

export const cliHelpText = `
Usage:
  gitz                      Index of commands
  gitz status               (s) Current branch status
  gitz branch <name?>       (b) Create new feature branch
  gitz checkout             (c) Switch to feature branch
  gitz commit <message?>    (m) Commit with issueId
  gitz update               (u) Rebase current branch onto ${env.masterBranch}

Options:
  -r --root                 Set the directory to run commands in
  -e --exit                 Exit immediately after a command has run
  -d --debug                Run with debug logs
  -v --version              Show version
  -h --help                 Show this screen
`

export type CliInputFlags = {
  root: StringFlag
  exit: BooleanFlag
  debug: BooleanFlag
  help: BooleanFlag
  version: BooleanFlag
}

export type CliInput = Result<CliInputFlags>

export type CliFlags = {
  root?: string
  exit?: boolean
  debug?: boolean
  help?: boolean
  version?: boolean
}

export interface Cli {
  command?: CliCommand
  args: string[]
  flags: CliFlags
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
    root: { type: 'string', default: process.env.PWD, alias: 'r' },
    exit: { type: 'boolean', default: false, alias: 'e' },
    debug: { type: 'boolean', default: false, alias: 'd' },
    help: { type: 'boolean', default: false, alias: 'h' },
    version: { type: 'boolean', default: false, alias: 'v' },
  },
})

const cli = parseCliInput(cliInput)

export default cli
