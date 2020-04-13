import React, { createContext, useContext, ReactNode } from 'react'

export const FocusContext = createContext<boolean | undefined>(undefined)

export default function FocusProvider({
  focus,
  children,
}: {
  focus: boolean
  children: ReactNode
}) {
  return <FocusContext.Provider value={focus}>{children}</FocusContext.Provider>
}

export function useFocus() {
  const context = useContext(FocusContext)
  return context
}
