import figures from 'figures'
import { Color, ColorProps, Text } from 'ink'
import React, { ReactNode } from 'react'
import useCli from '../hooks/useCli'
import { getLogColorProps, LogType } from './Log'
import Row from './Row'

interface LogTextProps extends ColorProps {
  type?: LogType
  children: ReactNode
}

function LogTextBase({ type, children, ...props }: LogTextProps) {
  return (
    <Text>
      <Color {...getLogColorProps(type)} {...props}>
        {children}
      </Color>
    </Text>
  )
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
  Success(props: Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.success}>{figures.tick}</LogTextBase>
        <LogTextBase type={LogType.success} {...props} />
      </Row>
    )
  },
  Warn(props: Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.warn}>{figures.warning}</LogTextBase>
        <LogTextBase type={LogType.warn} {...props} />
      </Row>
    )
  },
  Error(props: Omit<LogTextProps, 'type'>) {
    return (
      <Row gap={1}>
        <LogTextBase type={LogType.error}>{figures.cross}</LogTextBase>
        <LogTextBase type={LogType.error} {...props} />
      </Row>
    )
  },
}

export default LogText
