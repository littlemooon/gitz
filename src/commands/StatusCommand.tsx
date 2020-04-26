import React from 'react'
import BranchStatus from '../components/BranchStatus'
import FileStatus from '../components/FileStatus'

export default function StatusCommand() {
  return (
    <BranchStatus>
      <FileStatus />
    </BranchStatus>
  )
}
