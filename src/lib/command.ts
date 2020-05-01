import env from './env'

export enum CliCommandKey {
  'STATUS' = 'status',
  'BRANCH' = 'branch',
  'CHECKOUT' = 'checkout',
  'COMMIT' = 'commit',
  'UPDATE' = 'update',
  'STASH' = 'stash',
  'STASH_PUSH' = 'stash-push',
  'STASH_APPLY' = 'stash-apply',
  'STASH_DROP' = 'stash-drop',
}

export interface CliCommand {
  id: CliCommandKey
  name: string
  shortcut?: string
  description: string
  default?: boolean
  feature?: boolean
}

export const cliCommands: Record<CliCommandKey, CliCommand> = {
  [CliCommandKey.STATUS]: {
    id: CliCommandKey.STATUS,
    name: 'status',
    shortcut: 's',
    description: 'current branch status',
    default: true,
  },
  [CliCommandKey.BRANCH]: {
    id: CliCommandKey.BRANCH,
    name: 'branch',
    shortcut: 'b',
    description: 'create new feature branch',
    default: true,
  },
  [CliCommandKey.CHECKOUT]: {
    id: CliCommandKey.CHECKOUT,
    name: 'checkout',
    shortcut: 'c',
    description: 'switch to feature branch',
    default: true,
  },
  [CliCommandKey.COMMIT]: {
    id: CliCommandKey.COMMIT,
    name: 'commit',
    shortcut: 'm',
    description: 'commit with issueId',
    feature: true,
    default: true,
  },
  [CliCommandKey.UPDATE]: {
    id: CliCommandKey.UPDATE,
    name: 'update',
    shortcut: 'u',
    description: `rebase current branch onto ${env.masterBranch}`,
    feature: true,
    default: true,
  },
  [CliCommandKey.STASH]: {
    id: CliCommandKey.STASH,
    name: 'stash',
    shortcut: 't',
    description: `list stashed items`,
    default: true,
  },
  [CliCommandKey.STASH_PUSH]: {
    id: CliCommandKey.STASH_PUSH,
    name: 'push',
    description: `push changes onto stash`,
  },
  [CliCommandKey.STASH_APPLY]: {
    id: CliCommandKey.STASH_APPLY,
    name: 'pop',
    description: `apply latest stash item`,
  },
  [CliCommandKey.STASH_DROP]: {
    id: CliCommandKey.STASH_DROP,
    name: 'drop',
    description: `remove latest stash item`,
  },
}

export const defaultCliCommands = Object.values(cliCommands).filter(
  (command) => command.default
)
