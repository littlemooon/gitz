import React from 'react'
import Column from '../components/Column'
import Panels from '../components/Panels'
import BranchCommand from './BranchCommand'
import CheckoutCommand from './CheckoutCommand'
import StatusCommand from './StatusCommand'

export default function IndexCommand() {
  return (
    <Column>
      <StatusCommand />
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
