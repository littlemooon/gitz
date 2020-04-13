import figures from 'figures'
import { Box, Color } from 'ink'
import React from 'react'
import { useFocus } from '../providers/FocusProvider'

export default function SelectIndicator({ selected }: { selected?: boolean }) {
  const focus = useFocus()
  return (
    <Box marginRight={1}>
      {selected && focus ? <Color cyan>{figures.pointer}</Color> : ' '}
    </Box>
  )
}
