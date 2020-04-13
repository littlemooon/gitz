import { useEffect } from 'react'
import useCli from '../hooks/useCli'

export default function HelpCommand() {
  const { showHelp } = useCli()

  useEffect(() => {
    showHelp(0)
  }, [showHelp])

  return null
}
