import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { BranchSummary } from 'simple-git/typings/response'
import useGit, { GitState, GitStatus } from '../hooks/useGit'
import { filterArray } from '../lib/array'
import { Branch, parseBranch } from '../lib/branch'

export type GitBranchState = GitState<BranchSummary> & {
  branches: Branch[]
  current?: Branch
}

export type IGitBranchContext<R, A> = GitBranchState &
  GitState<R> & { run: (args: A) => void }

export const GitBranchContext = createContext<IGitBranchContext<any, any>>({
  status: GitStatus.initial,
  branches: [],
  current: undefined,
  result: undefined,
  error: undefined,
  run() {
    throw new Error('GitBranchContext has not been initialised')
  },
})

export default function GitBranchProvider({
  children,
}: {
  children: ReactNode
}) {
  const gitBranch = useGit((git) => git.branch())
  const [state, setState] = useState<GitBranchState>({
    ...gitBranch.state,
    branches: [],
  })

  useEffect(() => {
    const branches = filterArray(
      Object.values(gitBranch.state.result?.branches ?? {}).map(parseBranch)
    )
    setState({
      ...gitBranch.state,
      branches,
      current: branches.find((x) => x.current),
    })
  }, [gitBranch.state])

  return (
    <GitBranchContext.Provider value={{ ...state, ...gitBranch }}>
      {children}
    </GitBranchContext.Provider>
  )
}

export function useGitBranches() {
  const context = useContext(GitBranchContext)

  useEffect(() => {
    if (context.status === GitStatus.initial) {
      context.run(undefined)
    }
  }, [context])

  return context
}
