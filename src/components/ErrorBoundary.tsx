import React, { Component, ReactNode } from 'react'
import Column from './Column'
import Exit from './Exit'
import LogText from './LogText'
import Row from './Row'
import Table from './Table'

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
        <Row>
          <LogText.Error>{error.name}</LogText.Error>
          <LogText.Default>
            {error.message?.replace('error: ', '')}
          </LogText.Default>
          <Exit />
        </Row>

        <Table.Debug
          name="error boundary"
          data={{ componentStack: errorInfo.componentStack?.trim() }}
        />
      </Column>
    ) : (
      <>{this.props.children}</>
    )
  }
}
