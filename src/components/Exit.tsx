import React from 'react'
import useCli from '../hooks/useCli'
import useInit from '../hooks/useInit'
import { useExit } from '../providers/ExitProvider'
import LogText from './LogText'

export default function Exit({ reason }: { reason: string }) {
  const { exit } = useExit()
  const { flags } = useCli()

  useInit(exit)

  return flags.debug ? (
    <LogText.Debug prefix="Exit">{reason}</LogText.Debug>
  ) : null
}
