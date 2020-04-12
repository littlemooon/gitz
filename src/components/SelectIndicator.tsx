import figures from 'figures'
import { Box, Color } from 'ink'
import React from 'react'

export default function SelectIndicator({ selected }: { selected?: boolean }) {
  return (
    <Box marginRight={1}>
      {selected ? <Color cyan>{figures.pointer}</Color> : ' '}
    </Box>
  )
}
