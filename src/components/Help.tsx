import React, { Fragment, useEffect } from 'react'
import { ICli } from '../hooks/useCli'

export default function Help({ showHelp }: ICli) {
  useEffect(() => {
    showHelp(0)
  }, [])
  return <Fragment />
}
