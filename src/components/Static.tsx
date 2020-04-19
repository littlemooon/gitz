import { Children, ReactNode, useEffect } from 'react'
import useConstant from '../hooks/useConstant'
import { useStatic } from '../providers/StaticProvider'

export function Static({ children }: { children: ReactNode }) {
  const firstChildren = useConstant(() => children)
  const { addStatic } = useStatic()

  useEffect(() => {
    addStatic(Children.only(firstChildren))
  }, [addStatic, firstChildren])

  return null
}
