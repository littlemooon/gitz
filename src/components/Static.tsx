import { Children, ReactNode, useEffect } from 'react'
import getUuid from '../lib/uuid'
import { useStatic } from '../providers/StaticProvider'

export default function Static({
  id,
  children,
  prefix,
}: {
  id?: string
  prefix?: string
  children: ReactNode
}) {
  const { addStatic } = useStatic()

  useEffect(() => {
    Children.map(children, (c, i) =>
      addStatic(`${id ?? getUuid(prefix)}-${i}`, c)
    )
  }, [addStatic, children, prefix, id])

  return null
}
