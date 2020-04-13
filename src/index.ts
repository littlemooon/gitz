import { render } from 'ink'
import chalk from 'chalk'
import { createElement } from 'react'
import App from './App'
import updateNotifier from 'update-notifier'

const pkg = require(`${process.cwd()}/package.json`)

updateNotifier({ pkg }).notify()

render(createElement(App))

process.on('uncaughtException', (err) => {
  console.error(
    chalk(
      `${chalk.red('Uncaught Exception')}: ${chalk.red(err.name)} ${
        err.message
      }`
    )
  )
})
