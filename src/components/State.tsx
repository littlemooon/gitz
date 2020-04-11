import { Box } from 'ink'
import Spinner from 'ink-spinner'
import React, { Fragment, ReactNode } from 'react'
import { GitState, GitStatus } from '../hooks/useGit'
import Json from './Json'
import { Debug, Error, ErrorText, LogType } from './Log'
import { DebugTable, ErrorTable } from './Table'

export interface IStateProps<R> {
  name: string
  state: GitState<R>
  children: ReactNode
}

export function StateStatus<R>({
  children,
  state,
}: Omit<IStateProps<R>, 'name'>) {
  switch (state.status) {
    case GitStatus.loading:
      return <Spinner />

    case GitStatus.success:
      return <>{children}</>

    case GitStatus.error:
      return (
        <Error>
          <Box paddingBottom={1}>
            <ErrorText>There was an error</ErrorText>
          </Box>
          <ErrorTable
            data={{ name: state.error?.name, message: state.error?.message }}
          />
        </Error>
      )

    default:
      return <Fragment />
  }
}

export default function State<R>({ state, name, children }: IStateProps<R>) {
  return (
    <>
      <Debug name={name}>
        <DebugTable
          data={{
            status: state.status,
            ...(state.result && {
              result: {
                type: LogType.success,
                node: <Json>{state.result}</Json>,
              },
            }),
            ...(state.error && {
              error: { type: LogType.error, node: <Json>{state.error}</Json> },
            }),
          }}
        />
      </Debug>
      <StateStatus state={state}>{children}</StateStatus>
    </>
  )
}
