import chalk from 'chalk'
import { render } from 'ink'
import { createElement } from 'react'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'
import App from './App'

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
