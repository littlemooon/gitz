import { Box, useInput } from 'ink'
import React, { ReactNode, useMemo, useState } from 'react'
import { arrayRotate } from '../lib/array'
import FocusProvider, { useFocus } from '../providers/FocusProvider'
import Column from './Column'
import LogText from './LogText'
import RadioIndicator from './RadioIndicator'
import Title from './Title'

export type RadioItem<T extends object = {}> = T & {
  label?: string
  content?: ReactNode
  id: string
  current?: boolean
  shortcut?: string
}

export interface RadioProps {
  title?: string
  items: RadioItem[]
  initialIndex?: number
  limit?: number
  onSelect: (items: RadioItem[]) => void
  onHighlight?: (item: RadioItem) => void
}

export interface RadioState {
  rotateIndex: number
  focusIndex: number
}

export default function Select(props: RadioProps) {
  const focus = useFocus()

  const [state, setState] = useState<RadioState>({
    rotateIndex: 0,
    focusIndex: props.initialIndex ?? 0,
  })
  const [selected, setSelected] = useState<RadioItem[]>([])

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
      if (input === ' ') {
        const item = items[state.focusIndex]
        setSelected((selected) =>
          selected.find((x) => x.id === item.id)
            ? selected.filter((x) => x.id !== item.id)
            : [...selected, item]
        )
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
        if (props.onSelect) {
          props.onSelect(selected)
        }
      }
    }
  })

  return (
    <Column paddingTop={1}>
      {props.title && <Title>{props.title}</Title>}

      {items.map((item, index) => {
        const focussed = index === state.focusIndex
        return (
          <FocusProvider key={item.id} focus={focussed}>
            <Box>
              <RadioIndicator
                selected={Boolean(selected.find((x) => x.id === item.id))}
              />
              <Column>
                {item.label ? (
                  <LogText.Default bold={item.current} cyan={focus && focussed}>
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
