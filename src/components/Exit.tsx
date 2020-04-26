import { useApp } from 'ink'
import React, { useEffect } from 'react'
import Static from './Static'

function ExitNow() {
  const { exit } = useApp()

  useEffect(() => {
    exit()
  }, [exit])

  return null
}

export default function Exit() {
  return (
    <Static id="exit">
      <ExitNow />
    </Static>
  )
}
