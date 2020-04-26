import { render } from 'ink-testing-library'
import React from 'react'
import { createFormField } from '../../lib/form'
import Form from '../Form'

test('renders', () => {
  const onSubmit = jest.fn()
  const a = render(
    <Form
      title="Test form"
      fields={{
        test: createFormField({
          label: 'Test label',
          validate: () => undefined,
          format: (x) => x,
        }),
      }}
      onSubmit={onSubmit}
    />
  )

  expect(a.lastFrame()).toContain('Test form')
  expect(a.lastFrame()).toContain('Test label: ')

  a.stdin.write('a')
  expect(a.lastFrame()).toContain('Test label: a')

  a.stdin.write('sd')
  expect(a.lastFrame()).toContain('Test label: asd')
})
