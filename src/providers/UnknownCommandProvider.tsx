import React, { ReactNode } from 'react'
import Column from '../components/Column'
import LogText from '../components/LogText'
import useCli from '../hooks/useCli'

export default function UnknownCommandProvider({
  children,
}: {
  children: ReactNode
}) {
  const { command } = useCli()

  return (
    <Column>
      <LogText.Error prefix={'Unknown command'}>
        {command?.description}
      </LogText.Error>

      {children}
    </Column>
  )
}
