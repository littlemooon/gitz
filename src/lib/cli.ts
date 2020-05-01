import meow, { BooleanFlag, Result, StringFlag } from 'meow'
import { CliCommand, cliCommands } from './command'

export const cliHelpText = `
Usage:
  gitz                          Index of commands
  gitz (a) add                  Stage files for commit
  gitz (m) commit <message?>    Commit with issueId
  gitz (r) reset                Move staged files back to working
  gitz (c) checkout             Switch to feature branch
  gitz (b) branch <name?>       Create new feature branch
  gitz (u) update               Rebase current branch onto master
  gitz (p) push                 Push commits to origin
  gitz (t) stash                List stashed items


Options:
  -r --root                 Set the directory to run commands in
  -x --exit                 Exit immediately after a command has run
     --no-stash             Do not automatically stash
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
  'no-stash': BooleanFlag
}

const cliInput = meow<CliInputFlags>(cliHelpText, {
  flags: {
    root: { type: 'string', default: process.env.PWD, alias: 'r' },
    exit: { type: 'boolean', default: false, alias: 'x' },
    debug: { type: 'boolean', default: false, alias: 'd' },
    help: { type: 'boolean', default: false, alias: 'h' },
    version: { type: 'boolean', default: false, alias: 'v' },
    'no-stash': { type: 'boolean', default: false },
  },
})

export type CliInput = Result<CliInputFlags>

export type CliFlags = {
  root?: string
  exit?: boolean
  debug?: boolean
  help?: boolean
  version?: boolean
  noStash?: boolean
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
      ({ key, shortcut }) => command === key || command === shortcut
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

function parseFlags(flags: CliInput['flags']): CliFlags {
  return { ...flags, noStash: Boolean(flags['no-stash']) } as CliFlags
}

function parseCliInput(cliInput: CliInput): Cli {
  const [command, ...args] = cliInput.input

  return {
    command: parseCommand(command),
    args,
    flags: parseFlags(cliInput.flags),
    showHelp: cliInput.showHelp,
    showVersion: cliInput.showVersion,
  }
}

const cli = parseCliInput(cliInput)

export default cli
