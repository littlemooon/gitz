import { Box, BoxProps } from 'ink'
import React, { Children, ReactNode } from 'react'

export default function Row({
  children,
  gap,
  ...props
}: BoxProps & { gap?: number; children: ReactNode }) {
  return (
    <Box flexDirection="row" {...props}>
      {Children.map(children, (c, i) => (
        <Box paddingRight={i === Children.count(children) - 1 ? 0 : gap}>
          {c}
        </Box>
      ))}
    </Box>
  )
}
