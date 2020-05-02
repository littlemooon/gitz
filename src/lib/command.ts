import env from './env'
import { capitalize, getMaxLength, join, startsWith } from './string'

export enum CliCommandKey {
  'status' = 'status',
  'add' = 'add',
  'addAll' = 'add-all',
  'reset' = 'reset',
  'resetAll' = 'reset-all',
  'commit' = 'commit',
  'checkout' = 'checkout',
  'branch' = 'branch',
  'update' = 'update',
  'rebaseContinue' = 'rebase-continue',
  'rebaseAbort' = 'rebase-abort',
  'pull' = 'pull',
  'push' = 'push',
  'stash' = 'stash',
  'stashPut' = 'stash-put',
  'stashApply' = 'stash-apply',
  'stashDrop' = 'stash-drop',
  'unknown' = 'unknown',
}

export interface CliCommand {
  key: CliCommandKey
  shortcut?: string
  description: string
  argString?: string
  exposed?: boolean
  require?: {
    feature?: boolean
    working?: boolean
    staged?: boolean
    ahead?: boolean
    behind?: boolean
    current?: boolean
  }
}

export function createUnknownCommand(command: string) {
  return {
    key: CliCommandKey.unknown,
    description: command,
  }
}

export const cliCommands: Record<CliCommandKey, CliCommand> = {
  [CliCommandKey.status]: {
    key: CliCommandKey.status,
    shortcut: 's',
    description: 'current branch status',
    require: { current: true },
  },
  [CliCommandKey.add]: {
    key: CliCommandKey.add,
    shortcut: 'a',
    description: `stage files for commit`,
    exposed: true,
    require: { feature: true, working: true },
  },
  [CliCommandKey.addAll]: {
    key: CliCommandKey.addAll,
    shortcut: 'd',
    description: `stage all files for commit`,
    require: { working: true, feature: true },
  },
  [CliCommandKey.commit]: {
    key: CliCommandKey.commit,
    shortcut: 'm',
    argString: '<message?>',
    description: 'commit with issueId',
    require: { feature: true, staged: true, current: true },
    exposed: true,
  },
  [CliCommandKey.checkout]: {
    key: CliCommandKey.checkout,
    shortcut: 'c',
    description: 'switch to feature branch',
    exposed: true,
    require: { current: true },
  },
  [CliCommandKey.branch]: {
    key: CliCommandKey.branch,
    shortcut: 'b',
    argString: '<name?>',
    description: 'create new feature branch',
    require: { current: true },
    exposed: true,
  },
  [CliCommandKey.update]: {
    key: CliCommandKey.update,
    shortcut: 'u',
    description: `update to ${env.remoteOrigin} ${env.masterBranch}`,
    require: { feature: true, current: true },
    exposed: true,
  },
  [CliCommandKey.push]: {
    key: CliCommandKey.push,
    shortcut: 'p',
    description: `push commits to ${env.remoteOrigin}`,
    require: { feature: true, ahead: true, current: true },
    exposed: true,
  },
  [CliCommandKey.pull]: {
    key: CliCommandKey.pull,
    shortcut: 'l',
    description: `pull commits from ${env.remoteOrigin}`,
    require: { feature: true, behind: true, current: true },
    exposed: true,
  },
  [CliCommandKey.rebaseContinue]: {
    key: CliCommandKey.rebaseContinue,
    description: `continue the rebase after adding files`,
    require: {},
  },
  [CliCommandKey.rebaseAbort]: {
    key: CliCommandKey.rebaseAbort,
    description: `abort the rebase`,
    require: {},
  },
  [CliCommandKey.reset]: {
    key: CliCommandKey.reset,
    shortcut: 'r',
    description: `move staged files back to working`,
    require: { staged: true, current: true },
    exposed: true,
  },
  [CliCommandKey.resetAll]: {
    key: CliCommandKey.resetAll,
    description: `move all staged files back to working`,
    require: { staged: true, current: true },
  },
  [CliCommandKey.stash]: {
    key: CliCommandKey.stash,
    shortcut: 't',
    description: `manage stashed items`,
    require: { current: true },
  },
  [CliCommandKey.stashPut]: {
    key: CliCommandKey.stashPut,
    description: `put changes onto stash`,
    require: { staged: true, current: true },
  },
  [CliCommandKey.stashApply]: {
    key: CliCommandKey.stashApply,
    description: `apply latest stash item`,
    require: { current: true },
  },
  [CliCommandKey.stashDrop]: {
    key: CliCommandKey.stashDrop,
    description: `remove latest stash item`,
    require: { current: true },
  },
  [CliCommandKey.unknown]: createUnknownCommand(''),
}

export const exposedCliCommands = Object.values(cliCommands).filter(
  (command) => command.exposed
)

export const stashCliCommands = Object.values(cliCommands).filter((x) =>
  startsWith(x.key, 'stash-')
)

export const conflictCliCommands = Object.values(cliCommands).filter(
  (x) => !x.require?.current
)

export function getCommandHelpText(): { text: string; maxLength: number } {
  const commandStrings = Object.values(cliCommands).map((command) => {
    return join(
      [
        'gitz',
        command.shortcut && `(${command.shortcut})`,
        command.key,
        command.argString,
        '   ',
      ],
      ' '
    )
  })
  const maxLength = getMaxLength(commandStrings)
  const usageStrings = exposedCliCommands.map((command, i) => {
    return join(
      [commandStrings[i].padEnd(maxLength), capitalize(command.description)],
      ''
    )
  })

  return {
    maxLength,
    text: join(
      [
        'Usage:',
        join(['gitz'.padEnd(maxLength), 'Index of commands'], ''),
        join(usageStrings, '\n  '),
      ],
      '\n'
    ),
  }
}
