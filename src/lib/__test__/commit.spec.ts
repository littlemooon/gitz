import { parseCommitArgs } from '../commit'

describe('commit', () => {
  describe.skip('parseCommitArgs', () => {
    test.each([
      [[], { issueId: undefined, message: '' }],
      [['wEb-123'], { issueId: 'WEB-123', message: '' }],
      [['asd', 'qwe'], { issueId: undefined, message: 'asd qwe' }],
      [['some text wEb-123'], { issueId: 'WEB-123', message: 'some text' }],
      [
        ['with issue JIRAID: wEb-123'],
        { issueId: 'WEB-123', message: 'with issue' },
      ],
      [
        ['with issue', 'split', 'JIRAID: wEb-123'],
        { issueId: 'WEB-123', message: 'with issue split' },
      ],
      [['JIRAID: wEb-123'], { issueId: 'WEB-123', message: '' }],
    ])('%s', (input, expected) => {
      expect(parseCommitArgs(input)).toEqual(expected)
    })
  })
})
