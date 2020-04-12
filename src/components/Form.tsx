import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Column from './Column'
import Input from './Input'
import LogText from './LogText'

export interface FormField {
  label: string
  initialValue?: string
  value?: string
}

export type FormData = Record<string, FormField>

export interface FormProps<D> {
  label: string
  initialData: D
  onSubmit: (data: D) => void
}

export default function Form<D extends FormData>({
  label,
  initialData,
  onSubmit,
}: FormProps<D>) {
  const [data, setData] = useState<D>(initialData)

  const nextId = useMemo(() => {
    const nextItem = Object.entries(data).find(
      ([_, item]) => typeof item.value !== 'string'
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
  }, [nextId])

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
      <LogText.Default>{label}</LogText.Default>

      <Column paddingLeft={1}>
        {Object.entries(readonlyForm).map(([id, item]) => (
          <Input
            key={id}
            focus={false}
            label={item.label}
            initialValue={item.value}
          />
        ))}

        {nextId ? (
          <Input
            focus
            label={data[nextId].label}
            initialValue={data[nextId].initialValue}
            onSubmit={onSubmitNext}
          />
        ) : null}
      </Column>
    </Column>
  )
}
