import React, { ReactNode } from 'react'
import LogText from '../components/LogText'
import Router from '../components/Router'
import useCli from '../hooks/useCli'
import { GitMutationResponse } from '../hooks/useGitMutation'
import { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { toArray } from '../lib/array'
import { parseGitError } from '../lib/error'
import { isFunction } from '../lib/function'
import { StoreKey } from '../lib/store'
import { join, reduceWhitespace } from '../lib/string'
import CommandSelectProvider from '../providers/CommandSelectProvider'
import { Maybe } from '../types'
import Column from './Column'
import Exit from './Exit'
import Json from './Json'
import Table from './Table'

type GetGitRoute = (d: ReactNode) => Maybe<ReactNode>

export type GitRouteConfig = Partial<Record<GitStatus, GetGitRoute>>

export default function GitRouter({
  response,
  config,
  children,
}: {
  response: GitQueryResponse<StoreKey> | GitMutationResponse<any>
  config?: GitRouteConfig
  children: ReactNode
}) {
  const { flags } = useCli()
  const error = parseGitError(response.error)

  const defaults = {
    [GitStatus.initial]: null,
    [GitStatus.loading]: (
      <LogText.Loading prefix={response.name.title}>
        <Column>{response.name.content}</Column>
      </LogText.Loading>
    ),
    [GitStatus.success]: (
      <LogText.Success prefix={response.name.title}>
        <Column>
          {toArray(response.name.content).map((text, i) => (
            <LogText.Default key={i}>{text}</LogText.Default>
          ))}
        </Column>
      </LogText.Success>
    ),
    [GitStatus.error]: (
      <LogText.Error prefix={response.name.title}>
        {error?.message}
      </LogText.Error>
    ),
  }

  function getConfig(status: GitStatus, defaultRender?: ReactNode) {
    if (config && isFunction(config[status])) {
      return (config[status] as GetGitRoute)(defaults[status])
    } else {
      return defaultRender ?? defaults[status]
    }
  }

  return (
    <Column>
      <Table.Debug
        name={join(
          [
            reduceWhitespace(response.name.title),
            ...(response.name.content ?? []),
            response.status,
          ],
          '.'
        )}
        data={{
          status: response.status,
          ...(response.state && { state: <Json>{response.state}</Json> }),
          ...(response.error && { error: <Json>{response.error}</Json> }),
        }}
      />
      <Router
        path={response.status}
        config={{
          [GitStatus.initial]: getConfig(GitStatus.initial),

          [GitStatus.loading]: getConfig(GitStatus.loading),

          [GitStatus.success]: getConfig(
            GitStatus.success,
            <Column>
              {response.type === 'mutation'
                ? defaults[GitStatus.success]
                : null}

              {children}
            </Column>
          ),

          [GitStatus.error]: getConfig(
            GitStatus.error,
            <Column>
              {defaults[GitStatus.error]}

              {flags.exit ? (
                <Exit reason={join([response.name.title, 'error'], ' ')} />
              ) : (
                <CommandSelectProvider keys={error?.commands}>
                  {children}
                </CommandSelectProvider>
              )}
            </Column>
          ),
        }}
      />
    </Column>
  )
}
