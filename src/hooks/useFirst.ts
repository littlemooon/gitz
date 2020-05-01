import { useRef } from 'react'

type Constant<T> = { v: T }

export default function useFirst<T>(fn: () => T): T | undefined {
  const ref = useRef<Constant<T>>()

  if (!ref.current) {
    const v = fn()
    if (v) {
      ref.current = { v }
    }
  }

  return ref.current?.v
}
