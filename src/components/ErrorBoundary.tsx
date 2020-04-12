import React, { Component, ReactNode } from 'react'
import Column from './Column'
import Log from './Log'
import LogText from './LogText'
import Row from './Row'

interface ErrorBoundaryState {
  error?: Error
  errorInfo: any
}

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: undefined,
    errorInfo: undefined,
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error, errorInfo })
  }

  render() {
    const { error, errorInfo } = this.state

    return error ? (
      <Column>
        <Log.Error exit>
          <Row gap={1}>
            <LogText.Error>{error.name}</LogText.Error>
            <LogText.Default>
              {error.message?.replace('error: ', '')}
            </LogText.Default>
          </Row>
        </Log.Error>

        <Log.Debug name="componentStack">
          {errorInfo.componentStack?.trim()}
        </Log.Debug>
      </Column>
    ) : (
      <>{this.props.children}</>
    )
  }
}
