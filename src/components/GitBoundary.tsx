import Spinner from 'ink-spinner'
import React, { Fragment, ReactNode } from 'react'
import { GitState, GitStatus } from '../hooks/useGit'
import Column from './Column'
import Json from './Json'
import Log, { LogType } from './Log'
import LogText from './LogText'
import Row from './Row'
import Table from './Table'

export interface IGitBoundaryProps<R> {
  name: string
  state: GitState<R>
  children: ReactNode
}

export function GitBoundaryStatus<R>({
  children,
  state,
}: Omit<IGitBoundaryProps<R>, 'name'>) {
  switch (state.status) {
    case GitStatus.loading:
      return (
        <Log.Info>
          <Spinner />
        </Log.Info>
      )

    case GitStatus.success:
      return <>{children}</>

    case GitStatus.error:
      return (
        <Log.Error exit>
          <Row gap={1}>
            <LogText.Error>{state.error.name}</LogText.Error>
            <LogText.Default>{state.error.message}</LogText.Default>
          </Row>
        </Log.Error>
      )

    default:
      return <Fragment />
  }
}

export default function GitBoundary<R>({
  state,
  name,
  children,
}: IGitBoundaryProps<R>) {
  return (
    <Column>
      <Table.Debug
        name={name}
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

      <GitBoundaryStatus state={state}>{children}</GitBoundaryStatus>
    </Column>
  )
}
