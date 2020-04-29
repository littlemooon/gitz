import { Box } from 'ink'
import React, { ReactNode } from 'react'
import { isFunction } from 'util'
import LogText from '../components/LogText'
import Router from '../components/Router'
import useCli from '../hooks/useCli'
import { GitMutationResponse } from '../hooks/useGitMutation'
import { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { parseGitError } from '../lib/gitError'
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
  config: GitRouteConfig
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

  const id = join([response.name.prefix, response.status], '.')

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
          [GitStatus.initial]: isFunction(config[GitStatus.initial])
            ? (config[GitStatus.initial] as GetGitRoute)(
                defaults[GitStatus.initial]
              )
            : defaults[GitStatus.initial],

          [GitStatus.loading]: isFunction(config[GitStatus.loading])
            ? (config[GitStatus.loading] as GetGitRoute)(
                defaults[GitStatus.loading]
              )
            : defaults[GitStatus.loading],

          [GitStatus.success]: isFunction(config[GitStatus.success]) ? (
            (config[GitStatus.success] as GetGitRoute)(
              defaults[GitStatus.success]
            )
          ) : (
            <Column>
              <Static id={id}>
                <Box paddingBottom={1}>{defaults[GitStatus.success]}</Box>
              </Static>

              {children}
            </Column>
          ),

          [GitStatus.error]: isFunction(config[GitStatus.error]) ? (
            (config[GitStatus.error] as GetGitRoute)(defaults[GitStatus.error])
          ) : (
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
