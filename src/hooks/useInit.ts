import { EffectCallback, useEffect } from 'react'

export default function useInit(fn: EffectCallback): void {
  useEffect(() => {
    return fn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
