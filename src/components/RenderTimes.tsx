import React, { ReactNode, useEffect, useState } from 'react'

export default function RenderTimes({
  count,
  children,
}: {
  count: number
  children: ReactNode
}) {
  const [renderedCount, setCount] = useState<number>(0)

  useEffect(() => setCount((count) => count + 1), [])

  return renderedCount >= count ? null : <>{children}</>
}
