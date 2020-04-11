import { Box, Color, ColorProps, Text } from 'ink'
import React, { ReactNode } from 'react'
import useCli from '../hooks/useCli'

export enum LogType {
  debug = 'debug',
  info = 'info',
  success = 'success',
  warn = 'warn',
  error = 'error',
}

const logColorMap: Record<LogType, ColorProps> = {
  [LogType.debug]: { cyan: true },
  [LogType.info]: { blue: true },
  [LogType.success]: { green: true },
  [LogType.warn]: { yellow: true },
  [LogType.error]: { red: true },
}

const typeMaxLength =
  Math.max(...Object.values(LogType).map((x) => x.length)) + 1

function getTypeName(type: LogType) {
  return type.padEnd(typeMaxLength)
}

interface LogProps {
  type: LogType
  children: ReactNode
}

interface LogTextProps extends ColorProps {
  type?: LogType
  children: ReactNode
}

export function LogText({ type, children, ...props }: LogTextProps) {
  const typeColorProps = type ? logColorMap[type] : undefined
  return (
    <Text>
      <Color {...typeColorProps} {...props}>
        {children}
      </Color>
    </Text>
  )
}

export default function Log({ type, children }: LogProps) {
  const colorProps = logColorMap[type]

  return (
    <Box padding={1}>
      <LogText type={type} {...colorProps}>
        {getTypeName(type)}
      </LogText>
      <Box flexDirection="column">{children}</Box>
    </Box>
  )
}

export function Debug({
  children,
  name,
  ...props
}: Omit<LogProps, 'type'> & { name: string }) {
  const { flags } = useCli()
  return flags.debug ? (
    <Log type={LogType.debug} {...props}>
      <LogText yellow>{name}</LogText>
      {children}
    </Log>
  ) : null
}

export function DebugText(props: Omit<LogTextProps, 'type'>) {
  const { flags } = useCli()
  return flags.debug ? <LogText type={LogType.debug} {...props} /> : null
}

export function Info(props: Omit<LogProps, 'type'>) {
  return <Log type={LogType.info} {...props} />
}

export function InfoText(props: Omit<LogTextProps, 'type'>) {
  return <LogText type={LogType.info} {...props} />
}

export function Success(props: Omit<LogProps, 'type'>) {
  return <Log type={LogType.success} {...props} />
}

export function SuccessText(props: Omit<LogTextProps, 'type'>) {
  return <LogText type={LogType.success} {...props} />
}

export function Warn(props: Omit<LogProps, 'type'>) {
  return <Log type={LogType.warn} {...props} />
}

export function WarnText(props: Omit<LogTextProps, 'type'>) {
  return <LogText type={LogType.warn} {...props} />
}

export function Error(props: Omit<LogProps, 'type'>) {
  return <Log type={LogType.error} {...props} />
}
export function ErrorText(props: Omit<LogTextProps, 'type'>) {
  return <LogText type={LogType.error} {...props} />
}
