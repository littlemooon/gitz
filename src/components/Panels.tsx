import React, { useMemo, ReactNode, useState } from 'react'
import Column from './Column'
import Select, { SelectItem } from './Select'
import FocusProvider from '../providers/FocusProvider'

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
          <FocusProvider focus={item.id === selected?.id}>
            {item.content}
          </FocusProvider>
        ),
      }
    })
  }, [items, selected])

  return (
    <Column gap={1}>
      <FocusProvider focus={!selected}>
        <Select items={focusItems} onSelect={setSelected} />
      </FocusProvider>
    </Column>
  )
}
