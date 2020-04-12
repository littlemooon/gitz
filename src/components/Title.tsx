import { ColorProps } from 'ink'
import React, { ReactNode } from 'react'
import Column from '../components/Column'
import LogText from '../components/LogText'

export default function Title({
  children,
  ...props
}: { children: ReactNode } & ColorProps) {
  return (
    <Column paddingBottom={1}>
      <LogText.Default bold {...props}>
        {children}
      </LogText.Default>
    </Column>
  )
}
