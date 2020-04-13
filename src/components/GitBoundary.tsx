import Spinner from 'ink-spinner'
import React, { Fragment, ReactNode } from 'react'
import { GitState, GitStatus } from '../hooks/useGit'
import Column from './Column'
import Json from './Json'
import { LogType } from './Log'
import LogText from './LogText'
import Row from './Row'
import Table from './Table'

export interface GitBoundaryProps<R> {
  name: string
  state: GitState<R>
  children: ReactNode
}

export function GitBoundaryStatus<R>({ children, state }: GitBoundaryProps<R>) {
  switch (state.status) {
    case GitStatus.loading:
      return (
        <Row gap={1}>
          <Spinner />
          <LogText.Default>{name}</LogText.Default>
        </Row>
      )

    case GitStatus.success:
      return <>{children}</>

    default:
      return <Fragment />
  }
}

export default function GitBoundary<R>({
  state,
  name,
  children,
}: GitBoundaryProps<R>) {
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

      <GitBoundaryStatus state={state} name={name}>
        {children}
      </GitBoundaryStatus>
    </Column>
  )
}
