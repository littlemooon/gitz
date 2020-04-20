import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FocusProvider from '../providers/FocusProvider'
import Column from './Column'
import Input from './Input'
import Row from './Row'
import SelectIndicator from './SelectIndicator'

export interface FormField {
  label: string
  defaultValue?: string
  value?: string
  set?: boolean
  required?: boolean
  sanitize: (f: FormField) => string
}

export type FormFields<T = Record<string, FormField>> = Record<
  keyof T,
  FormField
>

export interface FormProps<D> {
  fields: D
  onSubmit: (data: D) => void
}

export default function Form<D extends FormFields>({
  fields,
  onSubmit,
}: FormProps<D>) {
  const [data, setData] = useState<D>(fields)

  const nextItem = useMemo(() => {
    const next = Object.entries(data).find(([, item]) => !item.set)
    return next ? { id: next[0], ...next[1] } : undefined
  }, [data])

  const readonlyForm = useMemo(() => {
    if (nextItem) {
      const ids = Object.keys(data)
      const nextIndex = ids.indexOf(nextItem.id)

      return Object.entries(data).reduce<Partial<D>>((acc, [id, value]) => {
        return ids.indexOf(id) < nextIndex ? { ...acc, [id]: value } : acc
      }, {})
    } else {
      return data
    }
  }, [nextItem, data])

  useEffect(() => {
    if (!nextItem && onSubmit) {
      onSubmit(data)
    }
  }, [data, nextItem, onSubmit])

  const onSubmitNext = useCallback(
    (value: string) => {
      if (nextItem && (value || !nextItem?.required)) {
        setData((form) => ({
          ...form,
          [nextItem.id]: { ...form[nextItem.id], value, set: true },
        }))
      }
    },
    [nextItem]
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

      {nextItem ? (
        <Row>
          <SelectIndicator selected />
          <Input
            label={nextItem.label}
            initialValue={nextItem.value}
            onSubmit={onSubmitNext}
          />
        </Row>
      ) : null}
    </Column>
  )
}
