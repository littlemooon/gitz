import React from 'react'
import { CliCommandKey } from '../lib/command'
import CommandSelectProvider from '../providers/CommandSelectProvider'
import Column from './Column'
import LogText from './LogText'

export default function Warning({
  text,
  content,
  commands,
}: {
  text: string
  content?: string[]
  commands?: CliCommandKey[]
}) {
  return (
    <Column>
      <LogText.Warn prefix={text}>
        {content ? <Column>{content}</Column> : null}
      </LogText.Warn>

      <CommandSelectProvider keys={commands} />
    </Column>
  )
}
