import { useEffect } from 'react'
import useCli from '../hooks/useCli'

export default function Help() {
  const { showHelp } = useCli()

  useEffect(() => {
    showHelp(0)
  }, [showHelp])

  return null
}
