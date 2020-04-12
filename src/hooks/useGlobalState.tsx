import { BooleanFlag, Result } from 'meow'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Command, commandInputMap } from '../Commands'
import Json from '../components/Json'
import Table from '../components/Table'

export interface IGlobal {
  command?: Command
  args: string[]
  flags: {
    debug?: boolean
  }
  /**
  Show the help text and exit with code.

  @param exitCode - The exit code to use. Default: `2`.
  */
  showHelp(exitCode?: number): void

  /**
  Show the version text and exit.
  */
  showVersion(): void
}

export type GlobalInputFlags = {
  debug: BooleanFlag
}

export type GlobalInput = Result<GlobalInputFlags>

export type GlobalFlags = {
  debug?: boolean
}

export const GlobalContext = createContext<IGlobal>({
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

export const GlobalDispatchContext = createContext<
  (Global: Partial<Omit<IGlobal, 'showHelp' | 'showVersion'>>) => void
>(() => {
  throw new Error('GlobalDispatchContext has not been initialized')
})

function parseCommand(command?: string): Command | undefined {
  if (command) {
    const c = commandInputMap[command]
    if (c) {
      return c
    } else {
      throw new Error(
        `Unknown command: ${command} [${Object.keys(commandInputMap).join(
          ', '
        )}]`
      )
    }
  }
}

function parseGlobalInput(GlobalInput: GlobalInput): IGlobal {
  const [command, ...args] = GlobalInput.input

  return {
    command: parseCommand(command),
    args,
    flags: GlobalInput.flags,
    showHelp: GlobalInput.showHelp,
    showVersion: GlobalInput.showVersion,
  }
}

export function GlobalProvider({
  GlobalInput,
  children,
}: {
  GlobalInput: GlobalInput
  children: ReactNode
}) {
  const [state, setState] = useState<IGlobal>(parseGlobalInput(GlobalInput))

  const setGlobal = useCallback(({ command, flags, args }) => {
    setState((state) => ({
      ...state,
      command: command ?? state.command,
      args: args ?? state.args,
      flags: flags ?? state.flags,
    }))
  }, [])

  return (
    <>
      <GlobalContext.Provider value={state}>
        <GlobalDispatchContext.Provider value={setGlobal}>
          <Table.Debug
            name="Global input"
            data={{
              command: state.command ?? 'index',
              args: <Json>{state.args}</Json>,
              flags: <Json>{state.flags}</Json>,
            }}
          />

          {children}
        </GlobalDispatchContext.Provider>
      </GlobalContext.Provider>
    </>
  )
}

export default function useGlobal() {
  return useContext(GlobalContext)
}

export function useSetGlobal() {
  return useContext(GlobalDispatchContext)
}
