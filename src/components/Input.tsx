import TextInput, { InkTextInputProps } from 'ink-text-input'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocus } from '../providers/FocusProvider'
import LogText from './LogText'
import Row from './Row'

export interface InputProps
  extends Omit<InkTextInputProps, 'value' | 'onChange' | 'focus'> {
  initialValue?: string
  onSubmit?: (value: string) => void
  label: string
}
export default function Input({
  onSubmit,
  initialValue = '',
  label,
  ...props
}: InputProps) {
  const focus = useFocus()
  const [value, setValue] = useState<string>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, label])

  const handleChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const handleSubmit = useCallback(
    (value: string) => {
      if (onSubmit) {
        onSubmit(value)
      }
    },
    [onSubmit]
  )

  return (
    <Row gap={1}>
      <LogText.Default>{label}:</LogText.Default>

      <TextInput
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
        {...props}
        focus={focus}
      />
    </Row>
  )
}
