import React from 'react'
import Column from '../components/Column'
import Panels from '../components/Panels'
import BranchCommand from './BranchCommand'
import CheckoutCommand from './CheckoutCommand'

export default function IndexCommand() {
  return (
    <Column gap={2}>
      {/* <StatusCommand key="status" /> */}
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
