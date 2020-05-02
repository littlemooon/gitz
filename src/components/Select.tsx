import { Box, useInput } from 'ink'
import React, { ReactNode, useMemo, useState } from 'react'
import { arrayOfLength, arrayRotate } from '../lib/array'
import { join } from '../lib/string'
import FocusProvider, { useFocus } from '../providers/FocusProvider'
import Column from './Column'
import LogText from './LogText'
import SelectIndicator from './SelectIndicator'
import Title from './Title'

export type SelectItem<T extends object = {}> = T & {
  label?: string
  content?: ReactNode
  id: string
  bold?: boolean
  shortcut?: string
}

export interface SelectGap extends SelectItem {
  type: 'gap'
}

export const selectGap: SelectGap = { type: 'gap', id: 'gap' }

export function isSelectGap(item: SelectItem | SelectGap): item is SelectGap {
  return (item as any).type === 'gap'
}

export interface SelectProps {
  title?: string
  items: Array<SelectItem | SelectGap>
  initialIndex?: number
  limit?: number
  onSelect: (item: SelectItem) => void
  onHighlight?: (item: SelectItem) => void
}

export interface SelectState {
  rotateIndex: number
  focusIndex: number
}

export default function Select(props: SelectProps) {
  const focus = useFocus()

  const [state, setState] = useState<SelectState>({
    rotateIndex: 0,
    focusIndex: props.initialIndex ?? 0,
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

    return slicedItems.sort((x) => (x.bold ? -1 : 1))
  }, [props.items, state.rotateIndex, limit, hasLimit])

  useInput((input, key) => {
    if (focus) {
      const shortcutItem = props.items.find((x) => x.shortcut === input)
      if (shortcutItem && !key.ctrl) {
        return props.onSelect(shortcutItem)
      }

      const shortcutIndex = arrayOfLength(props.items.length).find(
        (x) => x + 1 === parseInt(input)
      )
      if (shortcutIndex) {
        return props.onSelect(items[shortcutIndex])
      }

      if (key.upArrow) {
        const lastIndex = (hasLimit ? limit : props.items.length) - 1
        const atFirstIndex = state.focusIndex === 0
        const nextIndex = hasLimit ? state.focusIndex : lastIndex
        const nextRotateIndex = atFirstIndex
          ? state.rotateIndex + 1
          : state.rotateIndex
        const nextFocusIndex = atFirstIndex ? nextIndex : state.focusIndex - 1

        setState({
          rotateIndex: nextRotateIndex,
          focusIndex: nextFocusIndex,
        })

        const slicedItems = hasLimit
          ? arrayRotate(props.items, nextRotateIndex).slice(0, limit)
          : props.items
        if (props.onHighlight) {
          props.onHighlight(slicedItems[nextFocusIndex])
        }
      } else if (key.downArrow) {
        const atLastIndex =
          state.focusIndex === (hasLimit ? limit : props.items.length) - 1
        const nextIndex = hasLimit ? state.focusIndex : 0
        const nextRotateIndex = atLastIndex
          ? state.rotateIndex - 1
          : state.rotateIndex
        const nextFocusIndex = atLastIndex ? nextIndex : state.focusIndex + 1

        setState({
          rotateIndex: nextRotateIndex,
          focusIndex: nextFocusIndex,
        })

        const slicedItems = hasLimit
          ? arrayRotate(props.items, nextRotateIndex).slice(0, limit)
          : props.items

        if (props.onHighlight) {
          props.onHighlight(slicedItems[nextFocusIndex])
        }
      } else if (key.return) {
        const slicedItems = hasLimit
          ? arrayRotate(props.items, state.rotateIndex).slice(0, limit)
          : props.items

        if (props.onSelect) {
          props.onSelect(slicedItems[state.focusIndex])
        }
      }
    }
  })

  return (
    <Column>
      {props.title && <Title>{props.title}</Title>}

      {items.map((item, index) => {
        const focussed = index === state.focusIndex

        return (
          <FocusProvider key={item.id} focus={focussed}>
            <Box>
              <SelectIndicator selected={focussed} />
              <Column>
                {item.label ? (
                  <LogText.Default bold={item.bold} cyan={focus && focussed}>
                    {join([item.shortcut, item.label], ': ')}
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
