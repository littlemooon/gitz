import { Box, Static } from 'ink'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

const StaticContext = createContext<{
  addStatic(id: string, node: ReactNode): void
}>({
  addStatic() {
    throw new Error('StaticContext not initialised')
  },
})

export default function StaticProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Record<string, ReactNode>>({})

  const addStatic = useCallback((id: string, node: ReactNode) => {
    setState((state) => {
      return state[id] ? state : { ...state, [id]: node }
    })
  }, [])

  return (
    <StaticContext.Provider value={{ addStatic }}>
      <Static>
        {Object.entries(state).map(([id, node]) => (
          <Box key={id}>{node}</Box>
        ))}
      </Static>
      {children}
    </StaticContext.Provider>
  )
}

export function useStatic() {
  const context = useContext(StaticContext)

  return context
}
