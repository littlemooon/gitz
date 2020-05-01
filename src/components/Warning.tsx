import { Box } from 'ink'
import React, { ReactNode } from 'react'
import Column from './Column'
import LogText from './LogText'
import Static from './Static'

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
      <Static>
        <Box paddingBottom={1}>
          <LogText.Warn prefix={title}>
            {content ? <Column>{content}</Column> : null}
          </LogText.Warn>
        </Box>
      </Static>

      {children}
    </Column>
  )
}
