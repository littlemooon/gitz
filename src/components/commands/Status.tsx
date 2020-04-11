import React from 'react'
import { ICli } from '../../hooks/useCli'
import { useGitStatus } from '../../hooks/useGit'
import { Success } from '../Log'
import State from '../State'
import { SuccessTable } from '../Table'

export default function Status(_: ICli) {
  const { state } = useGitStatus()

  return (
    <State name="git status" state={state}>
      <Success>
        <SuccessTable data={{ tracking: state.result?.tracking }} />
      </Success>
    </State>
  )
}
