import React, { Component, createContext, ReactNode, useContext } from 'react'
import Column from './Column'
import Exit from './Exit'
import LogText from './LogText'
import Row from './Row'
import Table from './Table'

interface ErrorBoundaryState {
  error?: Error
  errorInfo: any
}

const ErrorContext = createContext<{ setError: (e: Error) => void }>({
  setError() {
    throw new Error('ErrorContext is not initialised')
  },
})

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

  setError = (error: Error) => {
    this.setState({ error })
  }

  render() {
    const { error, errorInfo } = this.state

    return (
      <ErrorContext.Provider value={{ setError: this.setError }}>
        {error ? (
          <Column>
            <Row gap={1}>
              <LogText.Error>{error.name}</LogText.Error>
              <LogText.Default>
                {error.message?.replace('error: ', '')}
              </LogText.Default>
              <Exit />
            </Row>

            {errorInfo ? (
              <Table.Debug
                name="error boundary"
                data={{ componentStack: errorInfo.componentStack?.trim() }}
              />
            ) : null}
          </Column>
        ) : (
          <>{this.props.children}</>
        )}
      </ErrorContext.Provider>
    )
  }
}

export function useError() {
  const context = useContext(ErrorContext)
  return context
}
