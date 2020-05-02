import React, { ReactNode } from 'react'
import { CliCommandKey } from '../lib/command'
import CommandSelectProvider from '../providers/CommandSelectProvider'
import { Maybe } from '../types'
import Column from './Column'
import LogText from './LogText'

export default function Warning({
  text,
  content,
  commands,
  children,
}: {
  text: string
  content?: Maybe<string>[]
  commands?: CliCommandKey[]
  children?: ReactNode
}) {
  return (
    <Column>
      <LogText.Warn prefix={text}>
        {content ? <Column>{content}</Column> : null}
      </LogText.Warn>

      {children ?? <CommandSelectProvider keys={commands} />}
    </Column>
  )
}
