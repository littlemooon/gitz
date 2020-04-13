import { useStdout } from 'ink'
import { useCallback, useEffect, useReducer } from 'react'
import { SimpleGit } from 'simple-git/promise'
import git from '../lib/git'
import useCli from './useCli'

export type RunGit<R, A> = (git: SimpleGit, args: A) => Promise<R>

export enum GitStatus {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface GitError {
  name: string
  message: string
}

export type GitState<R> =
  | {
      status: GitStatus.initial
      result: undefined
      error: undefined
    }
  | {
      status: GitStatus.loading
      result: undefined
      error: undefined
    }
  | {
      status: GitStatus.success
      result: R
      error: undefined
    }
  | {
      status: GitStatus.error
      result: undefined
      error: GitError
    }

export enum GitActionTypes {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export type GitAction<R> =
  | { type: GitActionTypes.loading }
  | { type: GitActionTypes.success; payload: R }
  | { type: GitActionTypes.error; payload: GitError }

export type GitReducer<R> = (
  state: GitState<R>,
  action: GitAction<R>
) => GitState<R>

function reducer<R>(state: GitState<R>, action: GitAction<R>): GitState<R> {
  switch (action.type) {
    case GitActionTypes.loading:
      return { status: GitStatus.loading, result: undefined, error: undefined }
    case GitActionTypes.success:
      return {
        status: GitStatus.success,
        result: action.payload,
        error: undefined,
      }
    case GitActionTypes.error:
      return {
        status: GitStatus.error,
        result: undefined,
        error: action.payload,
      }
    default:
      return state
  }
}

export interface GitOptions<A> {
  log?: boolean
  runWith?: A
}

export default function useGit<A, R>(
  runGit: RunGit<R, A>,
  opts?: GitOptions<A>
): { state: GitState<R>; run: (args: A) => void } {
  const { runWith, log } = opts ?? {}
  const { flags } = useCli()
  const stdoutStream = useStdout()

  const [state, dispatch] = useReducer<GitReducer<R>>(reducer, {
    status: GitStatus.initial,
    result: undefined,
    error: undefined,
  })

  const run = useCallback(
    (args) => {
      let cancelled = false

      runGit(
        git.outputHandler((_, stdout, stderr) => {
          if (log || flags.debug) {
            stdout.pipe(stdoutStream.stdout)
            stderr.pipe(stdoutStream.stdout)
          }
        }),
        args
      )
        .then((result) => {
          if (!cancelled) {
            dispatch({ type: GitActionTypes.success, payload: result })
          }
        })
        .catch((error) => {
          if (!cancelled) {
            dispatch({ type: GitActionTypes.error, payload: error })
          }
        })

      return () => {
        cancelled = true
      }
    },
    [flags.debug, log, runGit, stdoutStream.stdout]
  )

  useEffect(() => {
    if (runWith && state.status === GitStatus.initial) {
      run(runWith)
    }
  }, [runWith, run, state.status])

  return { state, run }
}
