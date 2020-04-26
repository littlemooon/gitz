import React, { ReactNode, useMemo } from 'react'
import useCli from '../hooks/useCli'
import Column from './Column'
import { LogType } from './Log'
import LogText from './LogText'
import Row from './Row'
import Static from './Static'

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
    <Column paddingLeft={2}>
      {Object.entries(data).map(([key, value]) => {
        const row = parseRow(value)
        return (
          <Row key={key} gap={1}>
            <LogText.Default type={row.type ?? type}>
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
      <Static id={name}>
        <Column>
          <LogText.Default yellow>{name}</LogText.Default>
          <TableBase type={LogType.debug} {...props} />
        </Column>
      </Static>
    ) : null
  },
  Info(props: Omit<TableProps, 'type'>) {
    return <TableBase type={LogType.info} {...props} />
  },
  Success(props: Omit<TableProps, 'type'>) {
    return <TableBase type={LogType.success} {...props} />
  },
  Warn(props: Omit<TableProps, 'type'>) {
    return <TableBase type={LogType.warn} {...props} />
  },
  Error(props: Omit<TableProps, 'type'>) {
    return <TableBase type={LogType.error} {...props} />
  },
}

export default Table
