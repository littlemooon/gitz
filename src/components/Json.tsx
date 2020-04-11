import React from 'react'

export default function Json({ children }: { children: any }) {
  return <>{JSON.stringify(children, undefined, 2)}</>
}
