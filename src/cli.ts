import { render } from 'ink'
import meow from 'meow'
import { createElement } from 'react'
import App from './components/App'
import { CliInputFlags } from './hooks/useCli'

export const cliHelpText = `
Usage
  $ gira

Options
  --name Your name

Examples
  $ gira --name=Jane
  Hello, Jane
`

const cliInput = meow<CliInputFlags>(cliHelpText, {
  flags: { debug: { type: 'boolean', default: false } },
})

render(createElement(App, { cliInput }))
