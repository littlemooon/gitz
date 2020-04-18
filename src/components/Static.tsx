import { Children, ReactNode, useEffect } from 'react'
import { useStatic } from '../providers/StaticProvider'

export function Static({ children }: { children: ReactNode }) {
  const { addStatic } = useStatic()

  useEffect(() => {
    addStatic(Children.only(children))
  }, [addStatic, children])

  return null
}
