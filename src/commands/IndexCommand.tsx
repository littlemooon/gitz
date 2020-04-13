import React from 'react'
import CheckoutCommand from './CheckoutCommand'
import Panels from '../components/Panels'
import Column from '../components/Column'
import BranchCommand from './BranchCommand'

export default function IndexCommand() {
  return (
    <Column gap={2}>
      <Panels
        items={[
          { id: 'branch', content: <BranchCommand /> },
          {
            id: 'checkout',
            content: <CheckoutCommand />,
          },
        ]}
      />
    </Column>
  )
}
