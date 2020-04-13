import { render } from 'ink-testing-library'
import React from 'react'
import App from '../src/App'

test('renders', () => {
  render(<App />)
  expect(true).toBe(true)
})
