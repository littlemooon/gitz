import { Children, ReactNode, useEffect } from 'react'
import useConstant from '../hooks/useConstant'
import { useStatic } from '../providers/StaticProvider'

export function Static({ children }: { children: ReactNode }) {
  const firstChildren = useConstant(() => children)
  const { addStatic } = useStatic()

  useEffect(() => {
    Children.map(firstChildren, (c) => addStatic(c))
  }, [addStatic, firstChildren])

  return null
}
