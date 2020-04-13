import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FocusProvider from '../providers/FocusProvider'
import Column from './Column'
import Input from './Input'
import Row from './Row'
import SelectIndicator from './SelectIndicator'

export interface FormField {
  label: string
  initialValue?: string
  value?: string
}

export type FormData = Record<string, FormField>

export interface FormProps<D> {
  initialData: D
  onSubmit: (data: D) => void
}

export default function Form<D extends FormData>({
  initialData,
  onSubmit,
}: FormProps<D>) {
  const [data, setData] = useState<D>(initialData)

  const nextId = useMemo(() => {
    const nextItem = Object.entries(data).find(
      ([, item]) => typeof item.value !== 'string'
    )
    return nextItem ? nextItem[0] : undefined
  }, [data])

  const readonlyForm = useMemo(() => {
    if (nextId) {
      const ids = Object.keys(data)
      const nextIndex = ids.indexOf(nextId)

      return Object.entries(data).reduce<Partial<D>>((acc, [id, value]) => {
        return ids.indexOf(id) < nextIndex ? { ...acc, [id]: value } : acc
      }, {})
    } else {
      return data
    }
  }, [nextId, data])

  useEffect(() => {
    if (!nextId && onSubmit) {
      onSubmit(data)
    }
  }, [data, nextId, onSubmit])

  const onSubmitNext = useCallback(
    (value: string) => {
      if (nextId) {
        setData((form) => ({ ...form, [nextId]: { ...form[nextId], value } }))
      }
    },
    [nextId]
  )

  return (
    <Column>
      {Object.entries(readonlyForm).map(([id, item]) => (
        <FocusProvider key={id} focus={false}>
          <Row>
            <SelectIndicator selected={false} />
            <Input label={item.label} initialValue={item.value} />
          </Row>
        </FocusProvider>
      ))}

      {nextId ? (
        <Row>
          <SelectIndicator selected />
          <Input
            label={data[nextId].label}
            initialValue={data[nextId].initialValue}
            onSubmit={onSubmitNext}
          />
        </Row>
      ) : null}
    </Column>
  )
}
