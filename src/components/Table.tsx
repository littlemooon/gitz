import { Box } from 'ink'
import React, { ReactNode, useMemo } from 'react'
import useCli from '../hooks/useCli'
import { LogText, LogType } from './Log'

export interface TableRowNode {
  node: ReactNode
  type?: LogType
}

export type TableRow = ReactNode | TableRowNode

export interface TableProps {
  type?: LogType
  data: Record<string, ReactNode>
}

function parseRow(tableData: TableRow): TableRowNode {
  if (tableData && typeof tableData === 'object' && 'node' in tableData) {
    return tableData
  } else {
    return { node: tableData }
  }
}

export default function Table({ data, type }: TableProps) {
  const keys = Object.keys(data)
  const maxKey = useMemo(() => Math.max(...keys.map((x) => x.length)) + 1, [
    keys,
  ])

  return (
    <Box flexDirection="column">
      {Object.entries(data).map(([key, value]) => {
        const row = parseRow(value)
        return (
          <Box flexDirection="row" key={key}>
            <LogText type={row.type ?? type} bold>
              {key.padEnd(maxKey)}
            </LogText>
            {row.node}
          </Box>
        )
      })}
    </Box>
  )
}

export function DebugTable(props: Omit<TableProps, 'type'>) {
  const { flags } = useCli()
  return flags.debug ? <Table type={LogType.debug} {...props} /> : null
}

export function InfoTable(props: Omit<TableProps, 'type'>) {
  return <Table type={LogType.info} {...props} />
}

export function SuccessTable(props: Omit<TableProps, 'type'>) {
  return <Table type={LogType.success} {...props} />
}

export function WarnTable(props: Omit<TableProps, 'type'>) {
  return <Table type={LogType.warn} {...props} />
}

export function ErrorTable(props: Omit<TableProps, 'type'>) {
  return <Table type={LogType.error} {...props} />
}
