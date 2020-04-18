import { Static } from 'ink'
import React, {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

const StaticContext = createContext<{ addStatic(node: ReactNode): void }>({
  addStatic() {
    throw new Error('StaticContext not initialised')
  },
})

export default function StaticProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReactNode[]>([])

  const addStatic = useCallback((node: ReactNode) => {
    setState((state) => [...state, node])
  }, [])

  return (
    <StaticContext.Provider value={{ addStatic }}>
      <Static>
        {state.map((node, i) => (
          <Fragment key={i}>{node}</Fragment>
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
