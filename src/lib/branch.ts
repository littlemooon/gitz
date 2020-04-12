import { capitalize } from './string'

export type BranchName = string

export interface BranchInput {
  issueId?: string
  description?: string
}

export interface Branch {
  name: string
  current?: boolean
  commit?: string
  label?: string
  description?: string
  issueId?: string
}

export interface BranchFeature extends Branch {
  description: string
  issueId: string
}

export function isBranchFeature(branch: Branch): branch is BranchFeature {
  return 'issueId' in branch
}

export function createBranchFeature(input: BranchInput): BranchFeature {
  if (!input.issueId) {
    throw new Error('Feature branch must have a valid issueId')
  }
  if (!input.description) {
    throw new Error('Feature branch must have a valid description')
  }

  const issueId = input.issueId.replace(/\s+/g, '-').toUpperCase()
  const description = capitalize(input.description.replace(/\s+/g, '_'))

  return {
    issueId,
    description,
    name: ['feature', issueId, description].join('-').toLowerCase(),
  }
}

export function parseBranch(branch: Branch): BranchFeature | Branch {
  const parsed = /^feature-([a-zA-Z]+-\d+)-(.*)/.exec(branch.name ?? '')

  if (parsed) {
    const name = parsed[0]
    const issueId = parsed[1].toUpperCase()
    const description = capitalize(parsed[2].replace(/_/g, ' '))

    return {
      ...branch,
      issueId,
      description,
      name,
    }
  } else {
    return branch
  }
}
