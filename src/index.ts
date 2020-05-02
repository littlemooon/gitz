#!/usr/bin/env node

import chalk from 'chalk'
import figures from 'figures'
import { render } from 'ink'
import { createElement } from 'react'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'
import App from './App'
import { join } from './lib/string'

updateNotifier({ pkg }).notify()

render(createElement(App))

process.on('uncaughtException', (err) => {
  console.error(
    chalk(
      join(
        [
          chalk.red.bold(figures.cross, 'Uncaught exception'),
          err.name,
          err.message,
        ],
        ' '
      )
    )
  )
})

process.on('unhandledRejection', (err: any) => {
  console.error(
    chalk(
      join(
        [
          chalk.red.bold(figures.cross, 'Unhandled rejection'),
          err?.name,
          err?.message,
        ],
        ' '
      )
    )
  )
})
