import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IRouteContext {
  path: string
  setPath(path: string): void
}

const RouteContext = createContext<IRouteContext>({
  path: '',
  setPath() {
    throw new Error('RouteContext not initialised')
  },
})

export default function Router({
  path,
  config,
}: {
  path?: string
  config: Record<string, ReactNode>
}) {
  const [state, setState] = useState<string>(path ?? '')

  useEffect(() => {
    if (path) {
      setState(path)
    }
  }, [path])

  return (
    <RouteContext.Provider value={{ path: state, setPath: setState }}>
      {config[state]}
    </RouteContext.Provider>
  )
}

export function useRoute() {
  const context = useContext(RouteContext)
  return context
}

export function RouteTo({ path }: { path: string }) {
  const { setPath } = useRoute()

  useEffect(() => {
    setPath(path)
  }, [path, setPath])

  return null
}
