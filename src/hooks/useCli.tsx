import { createContext, useContext } from 'react'
import { Cli } from '../lib/cli'

export const CliContext = createContext<Cli>({
  command: undefined,
  args: [],
  flags: {},
  showHelp() {
    throw new Error('InputContext has not been initialised')
  },
  showVersion() {
    throw new Error('InputContext has not been initialised')
  },
})

export const CliDispatchContext = createContext<
  (cli: Partial<Omit<Cli, 'showHelp' | 'showVersion'>>) => void
>(() => {
  throw new Error('CliDispatchContext has not been initialized')
})

export default function useCli() {
  return useContext(CliContext)
}

export function useSetCli() {
  return useContext(CliDispatchContext)
}
