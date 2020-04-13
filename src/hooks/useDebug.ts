import { useEffect } from 'react'
import usePrevious from './usePrevious'

export default function useDebug<T extends { [x: string]: any }>(
  name: string,
  obj: T
) {
  const prev = usePrevious<T>(obj)

  useEffect(() => {
    console.group(name)
    Object.entries(obj).forEach(([key, value]) => {
      if (prev) {
        if (value !== prev[key]) {
          console.log(key)
          console.log('from:', prev[key])
          console.log('to:', value)
        }
      }
    })
    console.groupEnd()
  }, [name, obj, prev])
}
