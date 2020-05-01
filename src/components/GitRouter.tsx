import { Box } from 'ink'
import React, { ReactNode } from 'react'
import LogText from '../components/LogText'
import Router from '../components/Router'
import useCli from '../hooks/useCli'
import { GitMutationResponse } from '../hooks/useGitMutation'
import { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { parseGitError } from '../lib/error'
import { isFunction } from '../lib/function'
import { StoreKey } from '../lib/store'
import { join } from '../lib/string'
import { Maybe } from '../types'
import Column from './Column'
import CommandSelect from './CommandSelect'
import Exit from './Exit'
import Json from './Json'
import Static from './Static'
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
  children?: ReactNode
}) {
  const { flags } = useCli()
  const error = parseGitError(response.error)

  const defaults = {
    [GitStatus.initial]: null,
    [GitStatus.loading]: (
      <LogText.Loading prefix={response.name.prefix}>
        {response.name.suffix}
      </LogText.Loading>
    ),
    [GitStatus.success]: (
      <LogText.Success prefix={response.name.prefix}>
        {response.name.suffix}
      </LogText.Success>
    ),
    [GitStatus.error]: (
      <LogText.Error prefix={response.name.prefix}>
        {error?.message}
      </LogText.Error>
    ),
  }

  const id = join(
    [response.name.prefix, response.name.suffix, response.status],
    '.'
  )

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
        name={join(['debug', id], '.')}
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
              {response.type === 'mutation' ? (
                <Static id={id}>
                  <Box paddingBottom={1}>{defaults[GitStatus.success]}</Box>
                </Static>
              ) : null}

              {children}
            </Column>
          ),

          [GitStatus.error]: getConfig(
            GitStatus.error,
            <Column>
              <Static id={id}>
                <Box paddingBottom={1}>{defaults[GitStatus.error]}</Box>
              </Static>

              {flags.exit ? (
                <Exit />
              ) : (
                <CommandSelect commands={error?.commands}>
                  {children}
                </CommandSelect>
              )}
            </Column>
          ),
        }}
      />
    </Column>
  )
}
