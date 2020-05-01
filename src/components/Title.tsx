import { ColorProps } from 'ink'
import React, { ReactNode } from 'react'
import LogText from '../components/LogText'

export default function Title({
  children,
  ...props
}: { children: ReactNode } & ColorProps) {
  return (
    <LogText.Default underline {...props}>
      {children}
    </LogText.Default>
  )
}
