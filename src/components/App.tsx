import React from 'react'
import { CliInput, CliProvider } from '../hooks/useCli'
import Commands from './Commands'

export default function App({ cliInput }: { cliInput: CliInput }) {
  return (
    <CliProvider cliInput={cliInput}>
      <Commands />
    </CliProvider>
  )
}
