import React, { Component, createContext, ReactNode, useContext } from 'react'
import Column from './Column'
import Exit from './Exit'
import LogText from './LogText'
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

  static getDerivedStateFromError(error: Error) {
    return { error }
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
            {errorInfo ? (
              <Table.Debug
                name="error boundary"
                data={{ componentStack: errorInfo.componentStack?.trim() }}
              />
            ) : null}

            <LogText.Error prefix={error.name}>
              {error.message}
              <Exit reason="errorboundary" />
            </LogText.Error>
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
