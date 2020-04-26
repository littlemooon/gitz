import { Box, useInput } from 'ink'
import React, { ReactNode, useMemo, useState } from 'react'
import { arrayRotate } from '../lib/array'
import FocusProvider, { useFocus } from '../providers/FocusProvider'
import Column from './Column'
import LogText from './LogText'
import SelectIndicator from './SelectIndicator'
import Title from './Title'

export type SelectItem<T extends object = {}> = T & {
  label?: string
  content?: ReactNode
  id: string
  current?: boolean
}

export interface SelectProps {
  title?: string
  items: SelectItem[]
  initialIndex?: number
  limit?: number
  onSelect: (item: SelectItem) => void
  onHighlight?: (item: SelectItem) => void
}

export interface SelectState {
  rotateIndex: number
  selectedIndex: number
}

export default function Select(props: SelectProps) {
  const focus = useFocus()

  const [state, setState] = useState<SelectState>({
    rotateIndex: 0,
    selectedIndex: props.initialIndex ?? 0,
  })
  const hasLimit =
    typeof props.limit === 'number' && props.items.length > props.limit

  const limit = hasLimit
    ? Math.min(props.limit ?? 0, props.items.length)
    : props.items.length

  const items = useMemo(() => {
    const slicedItems = hasLimit
      ? arrayRotate(props.items, state.rotateIndex).slice(0, limit)
      : props.items

    return slicedItems.sort((x) => (x.current ? -1 : 1))
  }, [props.items, state.rotateIndex, limit, hasLimit])

  useInput((input, key) => {
    if (focus) {
      if (key.upArrow) {
        const lastIndex = (hasLimit ? limit : props.items.length) - 1
        const atFirstIndex = state.selectedIndex === 0
        const nextIndex = hasLimit ? state.selectedIndex : lastIndex
        const nextRotateIndex = atFirstIndex
          ? state.rotateIndex + 1
          : state.rotateIndex
        const nextSelectedIndex = atFirstIndex
          ? nextIndex
          : state.selectedIndex - 1

        setState({
          rotateIndex: nextRotateIndex,
          selectedIndex: nextSelectedIndex,
        })

        const slicedItems = hasLimit
          ? arrayRotate(props.items, nextRotateIndex).slice(0, limit)
          : props.items
        if (props.onHighlight) {
          props.onHighlight(slicedItems[nextSelectedIndex])
        }
      } else if (key.downArrow) {
        const atLastIndex =
          state.selectedIndex === (hasLimit ? limit : props.items.length) - 1
        const nextIndex = hasLimit ? state.selectedIndex : 0
        const nextRotateIndex = atLastIndex
          ? state.rotateIndex - 1
          : state.rotateIndex
        const nextSelectedIndex = atLastIndex
          ? nextIndex
          : state.selectedIndex + 1

        setState({
          rotateIndex: nextRotateIndex,
          selectedIndex: nextSelectedIndex,
        })

        const slicedItems = hasLimit
          ? arrayRotate(props.items, nextRotateIndex).slice(0, limit)
          : props.items
        if (props.onHighlight) {
          props.onHighlight(slicedItems[nextSelectedIndex])
        }
      } else if (key.return) {
        const slicedItems = hasLimit
          ? arrayRotate(props.items, state.rotateIndex).slice(0, limit)
          : props.items
        if (props.onSelect) {
          props.onSelect(slicedItems[state.selectedIndex])
        }
      }
    }
  })

  return (
    <Column>
      {props.title && <Title>{props.title}</Title>}

      {items.map((item, index) => {
        const selected = index === state.selectedIndex

        return (
          <FocusProvider key={item.id} focus={selected}>
            <Box>
              <SelectIndicator selected={selected} />
              <Column>
                {item.label ? (
                  <LogText.Default bold={item.current} cyan={focus && selected}>
                    {item.label}
                  </LogText.Default>
                ) : null}

                {item.content}
              </Column>
            </Box>
          </FocusProvider>
        )
      })}
    </Column>
  )
}
