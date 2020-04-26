import React, { Children, ReactNode, useEffect } from 'react'
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
    if (id === 'BranchStatusProvider') {
      Children.map(firstChildren, (c, i) => addStatic(`${firstId}-${i}`, c))
    }
  }, [addStatic, firstChildren, id, firstId])

  return id === 'BranchStatusProvider' ? null : <>{children}</>
}
