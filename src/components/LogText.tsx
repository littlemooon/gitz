import figures from 'figures'
import { Color, ColorProps, Text } from 'ink'
import Spinner from 'ink-spinner'
import React, { ReactNode } from 'react'
import useCli from '../hooks/useCli'
import Row from './Row'
import Static from './Static'

export enum LogType {
  debug = 'debug',
  loading = 'loading',
  info = 'info',
  success = 'success',
  warn = 'warn',
  error = 'error',
}

const logColorProps: Record<LogType, ColorProps> = {
  [LogType.debug]: { cyan: true },
  [LogType.loading]: { cyan: true },
  [LogType.info]: { blue: true },
  [LogType.success]: { green: true },
  [LogType.warn]: { yellow: true },
  [LogType.error]: { red: true },
}

export function getLogColorProps(type?: LogType) {
  return type ? logColorProps[type] : undefined
}

interface LogTextProps extends ColorProps {
  type?: LogType
  children?: ReactNode
}

function LogTextBase({ type, children, ...props }: LogTextProps) {
  return children ? (
    <Text>
      <Color {...getLogColorProps(type)} {...props}>
        {children}
      </Color>
    </Text>
  ) : null
}

const LogText = {
  Default(props: LogTextProps) {
    return <LogTextBase {...props} />
  },
  Debug(props: Omit<LogTextProps, 'type'>) {
    const { flags } = useCli()

    return flags.debug ? (
      <Static>
        <LogTextBase type={LogType.debug} {...props} />
      </Static>
    ) : null
  },
  Info({ prefix, ...props }: { prefix?: string } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.info}>{figures.info}</LogTextBase>
        <LogTextBase type={LogType.info} bold {...props}>
          {prefix}
        </LogTextBase>
        <LogTextBase {...props} />
      </Row>
    )
  },
  Loading({
    prefix,
    ...props
  }: { prefix?: string } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <Color cyan>
          <Spinner type="dots" />
        </Color>
        <LogTextBase type={LogType.loading} {...props}>
          {prefix}
        </LogTextBase>
        <LogTextBase {...props} />
      </Row>
    )
  },
  Success({
    prefix,
    ...props
  }: { prefix?: string } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.success}>{figures.tick}</LogTextBase>
        <LogTextBase type={LogType.success} bold {...props}>
          {prefix}
        </LogTextBase>
        <LogTextBase {...props} />
      </Row>
    )
  },
  Warn({ prefix, ...props }: { prefix?: string } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.warn}>{figures.warning}</LogTextBase>
        <LogTextBase type={LogType.warn} bold {...props}>
          {prefix}
        </LogTextBase>
        <LogTextBase {...props} />
      </Row>
    )
  },
  Error({
    prefix,
    children,
    ...props
  }: { prefix?: string } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.error}>{figures.cross}</LogTextBase>
        <LogTextBase type={LogType.error} bold {...props}>
          {prefix ?? 'Error'}
        </LogTextBase>
        <LogTextBase {...props}>
          {children?.toString().replace(/^error: /, '') ?? 'unknown'}
        </LogTextBase>
      </Row>
    )
  },
}

export default LogText
