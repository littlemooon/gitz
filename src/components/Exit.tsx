import { useApp } from 'ink'
import { useEffect } from 'react'

export default function Exit() {
  const { exit } = useApp()

  useEffect(() => {
    exit()
  }, [exit])

  return null
}
