import figures from 'figures'
import { Color, ColorProps, Text } from 'ink'
import Spinner from 'ink-spinner'
import React, { ReactNode } from 'react'
import useCli from '../hooks/useCli'
import Exit from './Exit'
import { getLogColorProps, LogType } from './Log'
import Row from './Row'

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
    return flags.debug ? <LogTextBase type={LogType.debug} {...props} /> : null
  },
  Info(props: Omit<LogTextProps, 'type'>) {
    return <LogTextBase type={LogType.info} {...props} />
  },
  Loading(props: Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <Color cyan>
          <Spinner type="dots" />
        </Color>
        <LogTextBase type={LogType.success} {...props} />
      </Row>
    )
  },
  Success({
    prefix,
    children,
    exit,
    ...props
  }: { prefix?: string; exit?: boolean } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.success}>{figures.tick}</LogTextBase>
        <LogTextBase type={LogType.success} {...props}>
          {prefix}
        </LogTextBase>
        <LogTextBase {...props}>{children}</LogTextBase>
        {exit ? <Exit /> : null}
      </Row>
    )
  },
  Warn({
    prefix,
    children,
    exit,
    ...props
  }: { prefix?: string; exit?: boolean } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.warn}>{figures.warning}</LogTextBase>
        <LogTextBase type={LogType.warn} {...props}>
          {prefix}
        </LogTextBase>
        <LogTextBase {...props}>{children}</LogTextBase>
        {exit ? <Exit /> : null}
      </Row>
    )
  },
  Error({
    prefix,
    children,
    exit,
    ...props
  }: { prefix?: string; exit?: boolean } & Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.error}>{figures.cross}</LogTextBase>
        <LogTextBase type={LogType.error} {...props}>
          {prefix ?? 'Error'}
        </LogTextBase>
        <LogTextBase {...props}>
          {children?.toString().replace(/^error: /, '') ?? 'unknown'}
        </LogTextBase>
        {exit ? <Exit /> : null}
      </Row>
    )
  },
}

export default LogText
