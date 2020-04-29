import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useInit from '../hooks/useInit'
import { filterArray } from '../lib/array'
import FocusProvider from '../providers/FocusProvider'
import { Maybe } from '../types'
import Column from './Column'
import Input from './Input'
import LogText from './LogText'
import Row from './Row'
import SelectIndicator from './SelectIndicator'
import Title from './Title'

export interface FormField {
  label: string
  defaultValue?: string
  value?: string
  set?: boolean
  required?: boolean
  validate: (f: FormField) => Maybe<string>
  format: (v?: string) => Maybe<string>
  validationError?: string
}

export type FormFields<T = Record<string, FormField>> = Record<
  keyof T,
  FormField
>

export interface FormProps<D> {
  title: string
  fields: D
  onSubmit: (data: D) => void
}

export default function Form<D extends FormFields>({
  title,
  fields,
  onSubmit,
}: FormProps<D>) {
  useInit(() => {
    const validationErrors = filterArray(
      Object.values(fields).map((field) => field.validate(field))
    )
    if (!validationErrors.length) {
      onSubmit(fields)
    }
  })

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
        const formattedValue = nextItem.format(value)

        setData((form) => {
          const validationError = nextItem.validate({
            ...form[nextItem.id],
            value: formattedValue,
          })

          return {
            ...form,
            [nextItem.id]: {
              ...form[nextItem.id],
              value: formattedValue,
              validationError,
              set: !validationError,
            },
          }
        })
      }
    },
    [nextItem]
  )

  return (
    <Column>
      <Title>{title}</Title>

      {Object.entries(readonlyForm).map(([id, item]) => (
        <FocusProvider key={id} focus={false}>
          <Row>
            <SelectIndicator selected={false} />
            <Input label={item.label} initialValue={item.value} />
          </Row>
        </FocusProvider>
      ))}

      {nextItem ? (
        <Column>
          <Row>
            <SelectIndicator selected />
            <Input
              label={nextItem.label}
              initialValue={nextItem.value}
              onSubmit={onSubmitNext}
            />
          </Row>

          {nextItem.validationError ? (
            <LogText.Error prefix="validation">
              {nextItem.validationError}
            </LogText.Error>
          ) : null}
        </Column>
      ) : null}
    </Column>
  )
}
