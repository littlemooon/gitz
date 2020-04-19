import { FormField, FormFields } from '../components/Form'
import env from './env'
import { createFormField } from './form'
import { capitalize } from './string'

export type BranchName = string
export type IssueId = string

export interface Branch {
  name: BranchName
  current?: boolean
  commit?: string
  label?: string
  description?: string
  issueId?: IssueId
}

export interface BranchFeature extends Branch {
  description: string
  issueId: IssueId
}

export function isFeatureBranch(branch?: Branch): branch is BranchFeature {
  return branch ? 'issueId' in branch : false
}

export interface FeatureBranchForm extends FormFields {
  issueId: FormField
  description: FormField
}

export const featureBranchForm: FeatureBranchForm = {
  issueId: createFormField({
    label: 'Issue ID',
    required: true,
    sanitize: (field: FormField): IssueId => {
      if (!field.value) {
        throw new Error('Issue ID required')
      }

      const issueId = field.value.replace(/\s+/g, '-').toUpperCase()
      if (!env.issueRegex.exec(issueId)) {
        throw new Error(
          `Issue ID (${issueId}) must be of form: ${env.issueRegex}`
        )
      }

      return issueId
    },
  }),
  description: createFormField({
    label: 'Description',
    required: true,
    sanitize: (field: FormField) => {
      if (!field.value) {
        throw new Error('Description required')
      }

      return capitalize(field.value.replace(/\s+/g, '_'))
    },
  }),
}

export function createFeatureBranch(form: FeatureBranchForm): BranchFeature {
  const issueId = form.issueId.sanitize(form.issueId)
  const description = form.description.sanitize(form.description)
  return {
    issueId,
    description,
    name: ['feature', issueId, description.toLowerCase()].join('-'),
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
