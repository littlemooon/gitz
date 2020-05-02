import React from 'react'
import useInit from '../hooks/useInit'
import { useExit } from '../providers/ExitProvider'
import LogText from './LogText'

export default function Exit() {
  const { exit } = useExit()

  useInit(exit)

  return <LogText.Default>Exiting</LogText.Default>
}
