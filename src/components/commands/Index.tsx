import React from 'react'
import { ICli } from '../../hooks/useCli'
import { useGitBranches } from '../../hooks/useGit'
import Json from '../Json'
import { Success } from '../Log'
import State from '../State'
import { SuccessTable } from '../Table'

export default function Index(_: ICli) {
  const { state } = useGitBranches()

  return (
    <State name="git branches" state={state}>
      <Success>
        <SuccessTable
          data={{
            all: <Json>{state.result?.all}</Json>,
            branches: <Json>{state.result?.branches}</Json>,
            current: <Json>{state.result?.current}</Json>,
            detached: <Json>{state.result?.detached}</Json>,
          }}
        />
      </Success>
    </State>
  )
}
