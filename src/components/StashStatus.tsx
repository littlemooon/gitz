import React from 'react'
import Row from '../components/Row'
import { Stash } from '../lib/stash'
import LogText from './LogText'

export default function StashStatus({ stash }: { stash: Stash }) {
  return (
    <Row gap={1} key={stash.date}>
      <LogText.Default>
        {new Date(stash.date).toLocaleDateString()}
      </LogText.Default>
      <LogText.Default magenta>
        {new Date(stash.date).toLocaleTimeString()}
      </LogText.Default>
      <LogText.Default>{stash.authorEmail ?? stash.authorName}</LogText.Default>
      <LogText.Default>{stash.message}</LogText.Default>
    </Row>
  )
}
