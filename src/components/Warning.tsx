import { Box } from 'ink'
import React, { ReactNode } from 'react'
import Column from './Column'
import LogText from './LogText'

export default function Warning({
  children,
  title,
  content,
}: {
  children: ReactNode
  title: string
  content?: string[]
}) {
  return (
    <Column>
      <Box paddingBottom={1}>
        <LogText.Warn prefix={title}>
          {content ? <Column>{content}</Column> : null}
        </LogText.Warn>
      </Box>

      {children}
    </Column>
  )
}
