import { useRef } from 'react'

type Constant<T> = { v: T }

export default function useConstant<T>(fn: () => T): T {
  const ref = useRef<Constant<T>>()

  if (!ref.current) {
    ref.current = { v: fn() }
  }

  return ref.current.v
}
