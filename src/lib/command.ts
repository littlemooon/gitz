import env from './env'

export enum CliCommandKey {
  'STATUS' = 'status',
  'BRANCH' = 'branch',
  'CHECKOUT' = 'checkout',
  'COMMIT' = 'commit',
  'UPDATE' = 'update',
  'STASH' = 'stash',
}

export interface CliCommand {
  id: CliCommandKey
  name: string
  shortcut?: string
  description: string
}

export const cliCommands: Record<CliCommandKey, CliCommand> = {
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
  [CliCommandKey.UPDATE]: {
    id: CliCommandKey.UPDATE,
    name: 'update',
    shortcut: 'u',
    description: `rebase current branch onto ${env.masterBranch}`,
  },
  [CliCommandKey.STASH]: {
    id: CliCommandKey.STASH,
    name: 'stash',
    shortcut: 't',
    description: `stash status`,
  },
}
