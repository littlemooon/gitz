import useCli from '../hooks/useCli'
import useInit from '../hooks/useInit'

export default function Help() {
  const { showHelp } = useCli()

  useInit(() => showHelp)

  return null
}
