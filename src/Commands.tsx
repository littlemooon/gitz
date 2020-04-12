import React, { ComponentType } from 'react'
import BranchCommand from './commands/BranchCommand'
import CheckoutCommand from './commands/CheckoutCommand'
import CommitCommand from './commands/CommitCommand'
import IndexCommand from './commands/IndexCommand'
import StatusCommand from './commands/StatusCommand'
import Help from './components/Help'
import useCli from './hooks/useCli'
import { ICli } from './providers/CliProvider'

export enum Command {
  'STATUS' = 'status',
  'BRANCH' = 'branch',
  'CHECKOUT' = 'checkout',
  'COMMIT' = 'commit',
}

const commandMap: Record<Command, ComponentType<ICli>> = {
  [Command.STATUS]: StatusCommand,
  [Command.BRANCH]: BranchCommand,
  [Command.CHECKOUT]: CheckoutCommand,
  [Command.COMMIT]: CommitCommand,
}

export const commandInputMap: Record<string, Command> = {
  status: Command.STATUS,
  s: Command.STATUS,
  branch: Command.BRANCH,
  b: Command.BRANCH,
  checkout: Command.CHECKOUT,
  c: Command.CHECKOUT,
  commit: Command.COMMIT,
  m: Command.COMMIT,
}

export default function Commands() {
  const cli = useCli()
  const Command = cli.command ? commandMap[cli.command] ?? Help : IndexCommand

  return <Command {...cli} />
}
