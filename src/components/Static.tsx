import { Children, ReactNode, useEffect } from 'react'
import useConstant from '../hooks/useConstant'
import getUuid from '../lib/uuid'
import { useStatic } from '../providers/StaticProvider'

export default function Static({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  const firstId = useConstant(() => id ?? getUuid())
  const firstChildren = useConstant(() => children)
  const { addStatic } = useStatic()

  useEffect(() => {
    // if (id === 'BranchStatusProvider') {
    Children.map(firstChildren, (c, i) => addStatic(`${firstId}-${i}`, c))
    // }
  }, [addStatic, firstChildren, id, firstId])

  // return id === 'BranchStatusProvider' ? null : <>{children}</>
  return null
}
