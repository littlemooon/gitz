import React, { ReactNode } from 'react'
import { isFunction } from 'util'
import LogText from '../components/LogText'
import Router from '../components/Router'
import { GitMutationResponse } from '../hooks/useGitMutation'
import { GitQueryResponse, GitStatus } from '../hooks/useGitQuery'
import { StoreKey } from '../lib/store'
import { Maybe } from '../types'
import Exit from './Exit'
import Json from './Json'
import Table from './Table'

type GetGitRoute = (d: ReactNode) => Maybe<ReactNode>

export type GitRouteConfig = Partial<Record<GitStatus, GetGitRoute>>

export default function GitRouter({
  response,
  config,
}: {
  response: GitQueryResponse<StoreKey> | GitMutationResponse<any>
  config: GitRouteConfig
}) {
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
        {response.error?.message}
      </LogText.Error>
    ),
  }

  return (
    <>
      <Table.Debug
        name={response.name.prefix}
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
            <>
              {defaults[GitStatus.success]}
              <Exit />
            </>
          ),

          [GitStatus.error]: isFunction(config[GitStatus.error]) ? (
            (config[GitStatus.error] as GetGitRoute)(defaults[GitStatus.error])
          ) : (
            <>
              {defaults[GitStatus.error]}
              <Exit />
            </>
          ),
        }}
      />
    </>
  )
}
