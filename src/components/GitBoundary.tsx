import { Color } from 'ink'
import Spinner from 'ink-spinner'
import React, { ReactNode } from 'react'
import { GitMutationResponse } from '../hooks/useGitMutation'
import { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { StoreKey } from '../lib/store'
import Column from './Column'
import Exit from './Exit'
import Json from './Json'
import { LogType } from './Log'
import LogText from './LogText'
import Row from './Row'
import Table from './Table'

export interface GitBoundaryProps<K extends StoreKey, R> {
  loadingText?: string
  response: GitQueryResponse<K> | GitMutationResponse<R>
  children: ReactNode
}

export default function GitBoundary<K extends StoreKey, R>({
  loadingText,
  response,
  children,
}: GitBoundaryProps<K, R>) {
  return (
    <Column>
      <Table.Debug
        name={response.name}
        data={{
          status: response.status,
          ...(response.state && {
            result: {
              type: LogType.success,
              node: <Json>{response.state}</Json>,
            },
          }),
          ...(response.error && {
            error: { type: LogType.error, node: <Json>{response.error}</Json> },
          }),
        }}
      />

      {response.status === GitStatus.error ? (
        <>
          <Row gap={1}>
            <LogText.Error>{response.error?.name ?? 'Error'}</LogText.Error>
            <LogText.Default>
              {response.error?.message ?? 'unknown'}
            </LogText.Default>
          </Row>
          <Exit />
        </>
      ) : response.status === GitStatus.loading ? (
        <Row gap={1}>
          <Color cyan>
            <Spinner type="dots12" />
          </Color>
          <LogText.Default>{loadingText ?? response.name}</LogText.Default>
        </Row>
      ) : response.status === GitStatus.success ? (
        children
      ) : null}
    </Column>
  )
}
