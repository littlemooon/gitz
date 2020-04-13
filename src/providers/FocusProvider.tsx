import React, { createContext, ReactNode, useContext } from 'react'

export const FocusContext = createContext<boolean>(true)

export default function FocusProvider({
  force,
  focus,
  children,
}: {
  force?: boolean
  focus: boolean
  children: ReactNode
}) {
  const parentFocus = useContext(FocusContext)
  return (
    <FocusContext.Provider value={force ? focus : focus && parentFocus}>
      {children}
    </FocusContext.Provider>
  )
}

export function useFocus() {
  const context = useContext(FocusContext)
  return context
}
