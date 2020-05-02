import { Box, useApp } from 'ink'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Column from '../components/Column'
import LogText from '../components/LogText'
import useCli from '../hooks/useCli'
import { ExitContext } from './ExitProvider'

const StaticContext = createContext<{
  addStatic(id: string, node: ReactNode): void
}>({
  addStatic() {
    throw new Error('StaticContext not initialised')
  },
})

export default function StaticProvider({ children }: { children: ReactNode }) {
  const { exit } = useApp()
  const { flags } = useCli()
  const [exiting, setExiting] = useState(false)
  const [state, setState] = useState<Record<string, ReactNode>>({})

  const addStatic = useCallback((id: string, node: ReactNode) => {
    setState((state) => {
      return state[id] ? state : { ...state, [id]: node }
    })
  }, [])

  const onExit = useCallback(() => {
    setExiting(true)
  }, [])

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(exit, 0)
      return () => clearTimeout(timer)
    }
  }, [exit, exiting, state])

  return (
    <ExitContext.Provider value={{ exit: onExit }}>
      <StaticContext.Provider value={{ addStatic }}>
        {Object.entries(state).map(([id, node]) => {
          return (
            <Column key={id} paddingBottom={1}>
              {flags.debug ? <LogText.Default>{id}</LogText.Default> : null}
              <Box>{node}</Box>
            </Column>
          )
        })}

        {children}
      </StaticContext.Provider>
    </ExitContext.Provider>
  )
}

export function useStatic() {
  const context = useContext(StaticContext)

  return context
}
