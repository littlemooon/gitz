import { Box, BoxProps } from 'ink'
import React, { Children, ReactNode } from 'react'

export default function Column({
  children,
  gap,
  ...props
}: BoxProps & { gap?: number; children: ReactNode }) {
  return (
    <Box flexDirection="column" {...props}>
      {Children.map(children, (c, i) => (
        <Box paddingBottom={i === Children.count(children) - 1 ? 0 : gap}>
          {c}
        </Box>
      ))}
    </Box>
  )
}
