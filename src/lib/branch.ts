import env from './env'
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

export function isFeatureBranch(branch?: Branch): branch is BranchFeature {
  return branch ? 'issueId' in branch : false
}

export function createFeatureBranch(input: BranchInput): BranchFeature {
  if (!input.issueId) {
    throw new Error('Issue ID required')
  }
  if (!env.issueRegex.exec(input.issueId)) {
    throw new Error(`Issue ID must be of form: ${env.issueRegex}`)
  }
  if (!input.description) {
    throw new Error('Description required')
  }

  const issueId = input.issueId.replace(/\s+/g, '-').toUpperCase()
  const description = capitalize(input.description.replace(/\s+/g, '_'))

  return {
    issueId,
    description,
    name: ['feature', issueId, description].join('-').toLowerCase(),
  }
}

export function parseBranch(
  branch?: Branch
): BranchFeature | Branch | undefined {
  if (branch) {
    const featureBranch = env.featureBranchRegex.exec(branch.name ?? '')
    if (featureBranch) {
      return {
        ...branch,
        issueId: featureBranch[1].toUpperCase(),
        description: capitalize(featureBranch[2].replace(/_/g, ' ')),
        name: featureBranch[0],
      }
    }

    return branch
  }
}
