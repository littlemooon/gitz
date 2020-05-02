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
        content: selected ? (
          item.id === selected.id ? (
            <Box paddingBottom={1}>
              <FocusProvider force focus={true}>
                {item.content}
              </FocusProvider>
            </Box>
          ) : null
        ) : (
          <Box paddingBottom={1}>
            <FocusProvider focus={false}>{item.content}</FocusProvider>
          </Box>
        ),
      }
    })
  }, [items, selected])

  return (
    <FocusProvider focus={!selected}>
      <Select title="Panels" items={focusItems} onSelect={setSelected} />
    </FocusProvider>
  )
}
