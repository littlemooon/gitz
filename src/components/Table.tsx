import React, { ReactNode, useMemo } from 'react'
import useCli from '../hooks/useCli'
import Column from './Column'
import Log, { LogType } from './Log'
import LogText from './LogText'
import Row from './Row'

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

function TableBase({ data, type }: TableProps) {
  const keys = Object.keys(data)
  const maxKey = useMemo(() => Math.max(...keys.map((x) => x.length)), [keys])

  return (
    <Column>
      {Object.entries(data).map(([key, value]) => {
        const row = parseRow(value)
        return (
          <Row key={key} gap={1}>
            <LogText.Default type={row.type ?? type} bold>
              {key.padEnd(maxKey)}
            </LogText.Default>
            {row.node}
          </Row>
        )
      })}
    </Column>
  )
}

const Table = {
  Base: TableBase,
  Debug({ name, ...props }: Omit<TableProps, 'type'> & { name: string }) {
    const { flags } = useCli()
    return flags.debug ? (
      <Log.Debug name={name}>
        <TableBase type={LogType.debug} {...props} />
      </Log.Debug>
    ) : null
  },
  Info(props: Omit<TableProps, 'type'>) {
    return (
      <Log.Info>
        <TableBase type={LogType.info} {...props} />
      </Log.Info>
    )
  },
  Success({ exit, ...props }: Omit<TableProps, 'type'> & { exit?: boolean }) {
    return (
      <Log.Success exit={exit}>
        <TableBase type={LogType.success} {...props} />
      </Log.Success>
    )
  },
  Warn(props: Omit<TableProps, 'type'>) {
    return (
      <Log.Warn>
        <TableBase type={LogType.warn} {...props} />
      </Log.Warn>
    )
  },
  Error({ exit, ...props }: Omit<TableProps, 'type'> & { exit?: boolean }) {
    return (
      <Log.Error exit={exit}>
        <TableBase type={LogType.error} {...props} />
      </Log.Error>
    )
  },
}

export default Table
