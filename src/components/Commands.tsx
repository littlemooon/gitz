import React, { ComponentType } from 'react'
import useCli from '../hooks/useCli'
import { ICli } from './Cli'
import BranchFeatureCreate from './commands/BranchFeatureCreate'
import Index from './commands/Index'
import Status from './commands/Status'
import Help from './Help'

export enum Command {
  'STATUS' = 'status',
  'BRANCH_CREATE' = 'branch_create',
}

const commandMap: Record<Command, ComponentType<ICli>> = {
  [Command.STATUS]: Status,
  [Command.BRANCH_CREATE]: BranchFeatureCreate,
}

export const commandInputMap: Record<string, Command> = {
  status: Command.STATUS,
  s: Command.STATUS,
  branch: Command.BRANCH_CREATE,
  b: Command.BRANCH_CREATE,
}

export default function Commands() {
  const cli = useCli()
  const Command = cli.command ? commandMap[cli.command] ?? Help : Index

  return <Command {...cli} />
}
