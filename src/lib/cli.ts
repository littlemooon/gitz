import meow, { BooleanFlag, Result } from 'meow'

export enum CliCommandKey {
  'INDEX' = 'index',
  'STATUS' = 'status',
  'BRANCH' = 'branch',
  'CHECKOUT' = 'checkout',
  'COMMIT' = 'commit',
}

export interface CliCommand {
  id: CliCommandKey
  name: string
  shortcut?: string
  description: string
}

export const cliCommands: Record<CliCommandKey, CliCommand> = {
  [CliCommandKey.INDEX]: {
    id: CliCommandKey.INDEX,
    name: 'index',
    description: 'index of commands',
  },
  [CliCommandKey.STATUS]: {
    id: CliCommandKey.STATUS,
    name: 'status',
    shortcut: 's',
    description: 'current branch status',
  },
  [CliCommandKey.BRANCH]: {
    id: CliCommandKey.BRANCH,
    name: 'branch',
    shortcut: 'b',
    description: 'create new feature branch',
  },
  [CliCommandKey.CHECKOUT]: {
    id: CliCommandKey.CHECKOUT,
    name: 'checkout',
    shortcut: 'c',
    description: 'switch to feature branch',
  },
  [CliCommandKey.COMMIT]: {
    id: CliCommandKey.COMMIT,
    name: 'commit',
    shortcut: 'm',
    description: 'commit with issueId',
  },
}

export const cliHelpText = `
gitz - interactive git client for feature development

Usage:
  gitz                     (index of commands)
  gitz status              (s - current branch status)
  gitz branch <name>       (b - create new feature branch)
  gitz checkout            (c - switch to feature branch)
  gitz commit <message>    (m - commit with issueId)

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

function parseCommand(command?: string): CliCommand {
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
  } else {
    return cliCommands[CliCommandKey.INDEX]
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
