import { createContext, useContext } from 'react'

export const ExitContext = createContext<{
  exit: () => void
}>({
  exit() {
    throw new Error('ExitContext not initialised')
  },
})

export function useExit() {
  const context = useContext(ExitContext)

  return context
}
