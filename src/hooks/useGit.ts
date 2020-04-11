import { useCallback, useEffect, useReducer } from 'react'
import { SimpleGit } from 'simple-git/promise'
import { BranchSummary, StatusResult } from 'simple-git/typings/response'
import git, { gitBranchList, gitStatus } from '../lib/git'

export type RunGit<R> = (git: SimpleGit) => Promise<R>

export enum GitStatus {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface IGitError {
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
      error: IGitError
    }

export enum GitActionTypes {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export type GitAction<R> =
  | { type: GitActionTypes.loading }
  | { type: GitActionTypes.success; payload: R }
  | { type: GitActionTypes.error; payload: IGitError }

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

export default function useGit<R>(
  runGit: RunGit<R>
): { state: GitState<R>; run: () => void } {
  const [state, dispatch] = useReducer<GitReducer<R>>(reducer, {
    status: GitStatus.initial,
    result: undefined,
    error: undefined,
  })

  const run = useCallback(() => {
    runGit(git)
      .then((result) => {
        dispatch({ type: GitActionTypes.success, payload: result })
      })
      .catch((error) => {
        dispatch({ type: GitActionTypes.error, payload: error })
      })
  }, [])

  return { state, run }
}

export function useGitStatus() {
  const { state, run } = useGit<StatusResult>(gitStatus)

  useEffect(() => {
    run()
  }, [])

  return { state, run }
}

export function useGitBranches() {
  const { state, run } = useGit<BranchSummary>(gitBranchList)

  useEffect(() => {
    run()
  }, [])

  return { state, run }
}
