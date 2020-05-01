import chalk from 'chalk'
import figures from 'figures'
import { cliHelpText } from './cli'
import env from './env'
import { capitalize, getMaxLength, join } from './string'

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
  'push' = 'push',
  'pushOrigin' = 'push-origin',
  'pushOriginMaster' = 'push-origin-master',
  'stash' = 'stash',
  'stashPut' = 'stash-push',
  'stashApply' = 'stash-apply',
  'stashDrop' = 'stash-drop',
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
    changes?: boolean
  }
}

export const cliCommands: Record<CliCommandKey, CliCommand> = {
  [CliCommandKey.status]: {
    key: CliCommandKey.status,
    shortcut: 's',
    description: 'current branch status',
  },
  [CliCommandKey.add]: {
    key: CliCommandKey.add,
    shortcut: 'a',
    description: `stage files for commit`,
    exposed: true,
    require: { feature: true, working: true },
  },
  [CliCommandKey.commit]: {
    key: CliCommandKey.commit,
    shortcut: 'm',
    argString: '<message?>',
    description: 'commit with issueId',
    require: { feature: true, staged: true },
    exposed: true,
  },
  [CliCommandKey.reset]: {
    key: CliCommandKey.reset,
    shortcut: 'r',
    description: `move staged files back to working`,
    require: { staged: true },
    exposed: true,
  },
  [CliCommandKey.checkout]: {
    key: CliCommandKey.checkout,
    shortcut: 'c',
    description: 'switch to feature branch',
    exposed: true,
  },
  [CliCommandKey.branch]: {
    key: CliCommandKey.branch,
    shortcut: 'b',
    argString: '<name?>',
    description: 'create new feature branch',
    exposed: true,
  },
  [CliCommandKey.update]: {
    key: CliCommandKey.update,
    shortcut: 'u',
    description: `rebase current branch onto ${env.masterBranch}`,
    require: { feature: true },
    exposed: true,
  },
  [CliCommandKey.push]: {
    key: CliCommandKey.push,
    shortcut: 'p',
    description: `push commits to origin`,
    require: { feature: true, ahead: true },
    exposed: true,
  },
  [CliCommandKey.pushOrigin]: {
    key: CliCommandKey.pushOrigin,
    description: `push using local branch name (git push origin HEAD)`,
    require: { feature: true, ahead: true },
  },
  [CliCommandKey.pushOriginMaster]: {
    key: CliCommandKey.pushOriginMaster,
    description: `push using remote branch name (git push origin HEAD:master)`,
    require: { feature: true, ahead: true },
  },
  [CliCommandKey.stash]: {
    key: CliCommandKey.stash,
    shortcut: 't',
    description: `list stashed items`,
    exposed: true,
  },

  [CliCommandKey.addAll]: {
    key: CliCommandKey.addAll,
    shortcut: 'd',
    description: `stage all files for commit`,
    require: { working: true },
  },
  [CliCommandKey.resetAll]: {
    key: CliCommandKey.resetAll,
    description: `move all staged files back to working`,
    require: { staged: true },
  },
  [CliCommandKey.stashPut]: {
    key: CliCommandKey.stashPut,
    description: `push changes onto stash`,
    require: { changes: true },
  },
  [CliCommandKey.stashApply]: {
    key: CliCommandKey.stashApply,
    description: `apply latest stash item`,
  },
  [CliCommandKey.stashDrop]: {
    key: CliCommandKey.stashDrop,
    description: `remove latest stash item`,
  },
}

export const exposedCliCommands = Object.values(cliCommands).filter(
  (command) => command.exposed
)

export function parseCommand(command?: string): CliCommand | undefined {
  if (command) {
    const c = Object.values(cliCommands).find(
      ({ key, shortcut }) => command === key || command === shortcut
    )
    if (c) {
      return c
    } else {
      throw new Error(
        join(
          [
            join(
              [chalk.red.bold(`${figures.cross} Unknown command`), command],
              ' '
            ),
            cliHelpText,
          ],
          '\n'
        )
      )
    }
  }
}

export function getCommandHelpText(): { text: string; maxLength: number } {
  const commandStrings = exposedCliCommands.map((command) => {
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
