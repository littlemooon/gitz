import { Box } from 'ink'
import React, { ReactNode, useMemo, useState } from 'react'
import FocusProvider from '../providers/FocusProvider'
import Select, { SelectItem } from './Select'

export interface PanelItem extends SelectItem {
  content: ReactNode
}

export default function Panels({ items }: { items: PanelItem[] }) {
  const [selected, setSelected] = useState<SelectItem>()

  const focusItems = useMemo(() => {
    return items.map((item) => {
      return {
        ...item,
        content: (
          <Box paddingBottom={1}>
            <FocusProvider force focus={item.id === selected?.id}>
              {item.content}
            </FocusProvider>
          </Box>
        ),
      }
    })
  }, [items, selected])

  return (
    <FocusProvider focus={!selected}>
      <Select items={focusItems} onSelect={setSelected} />
    </FocusProvider>
  )
}
