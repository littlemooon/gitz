import React, { ReactNode } from 'react'
import Column from '../components/Column'
import LogText from '../components/LogText'
import Static from '../components/Static'
import useCli from '../hooks/useCli'

export default function UnknownCommandProvider({
  children,
}: {
  children: ReactNode
}) {
  const { command } = useCli()

  return (
    <Column>
      <Static id={'unknowncommand'}>
        <LogText.Error prefix={'Unknown command'}>
          {command?.description}
        </LogText.Error>
      </Static>

      {children}
    </Column>
  )
}
