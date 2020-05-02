import figures from 'figures'
import { Box, Color } from 'ink'
import React from 'react'
import { useFocus } from '../providers/FocusProvider'

export default function RadioIndicator({ selected }: { selected?: boolean }) {
  const focus = useFocus()
  return (
    <Box marginRight={1}>
      {focus ? (
        <Color bold cyan>
          {selected ? figures.radioOn : figures.radioOff}
        </Color>
      ) : selected ? (
        figures.circleFilled
      ) : (
        ' '
      )}
    </Box>
  )
}
