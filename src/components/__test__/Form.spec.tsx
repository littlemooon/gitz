import { render } from 'ink-testing-library'
import React from 'react'
import { createFormField } from '../../lib/form'
import Form from '../Form'

test('renders', () => {
  const onSubmit = jest.fn()
  const a = render(
    <Form
      fields={{
        test: createFormField({
          label: 'Test Label',
          validate: () => undefined,
          format: (x) => x,
        }),
      }}
      onSubmit={onSubmit}
    />
  )

  expect(a.lastFrame()).toContain('Test Label: ')

  a.stdin.write('a')
  expect(a.lastFrame()).toContain('Test Label: a')

  a.stdin.write('sd')
  expect(a.lastFrame()).toContain('Test Label: asd')
})
