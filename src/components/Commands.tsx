import React, { ComponentType } from 'react'
import useCli, { CliCommand, ICli } from '../hooks/useCli'
import Index from './commands/Index'
import Status from './commands/Status'
import Help from './Help'

const commandMap: Record<CliCommand, ComponentType<ICli>> = {
  [CliCommand.STATUS]: Status,
}

export default function Commands() {
  const cli = useCli()
  const Command = cli.command ? commandMap[cli.command] ?? Help : Index

  return <Command {...cli} />
}
