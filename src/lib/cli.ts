import meow, { BooleanFlag, Result } from 'meow'

export enum CliCommand {
  'INDEX' = 'index',
  'STATUS' = 'status',
  'BRANCH' = 'branch',
  'CHECKOUT' = 'checkout',
  'COMMIT' = 'commit',
}

export const commandInputMap: Record<string, CliCommand> = {
  status: CliCommand.STATUS,
  s: CliCommand.STATUS,
  branch: CliCommand.BRANCH,
  b: CliCommand.BRANCH,
  checkout: CliCommand.CHECKOUT,
  c: CliCommand.CHECKOUT,
  commit: CliCommand.COMMIT,
  m: CliCommand.COMMIT,
}

export const cliHelpText = `
gitet - interactive git client for feature development

Usage:
  gitet                     (index of commands)
  gitet status              (s - current branch status)
  gitet branch <name>       (b - create new feature branch)
  gitet checkout            (c - switch to feature branch)
  gitet commit <message>    (m - commit with issueId)

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
  } else {
    return CliCommand.INDEX
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
