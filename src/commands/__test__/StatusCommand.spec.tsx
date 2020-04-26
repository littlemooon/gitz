import { render } from 'ink-testing-library'
import React from 'react'
import git from '../../lib/git'
import StatusCommand from '../StatusCommand'

jest.mock('../../lib/git')

describe('StatusCommand', () => {
  beforeAll(() => {
    ;(git.branch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({ asd: 'asd' })
    })
    ;(git.status as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          return resolve({ status: 'status' })
        })
    )
  })

  test.skip('renders', async () => {
    const a = render(<StatusCommand />)
    expect(a.lastFrame().includes('Branch status')).toBe(true)
  })
})
