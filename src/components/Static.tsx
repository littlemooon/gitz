import { Children, ReactNode, useEffect } from 'react'
import useConstant from '../hooks/useConstant'
import { useStatic } from '../providers/StaticProvider'

export default function Static({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const firstId = useConstant(() => id)
  const firstChildren = useConstant(() => children)
  const { addStatic } = useStatic()

  useEffect(() => {
    Children.map(firstChildren, (c, i) => addStatic(`${firstId}-${i}`, c))
  }, [addStatic, firstChildren, firstId])

  return null
}
