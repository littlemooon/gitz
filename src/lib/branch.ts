import chalk from 'chalk'
import { FormField, FormFields } from '../components/Form'
import env from './env'
import { createFormField, throwValidationErrors } from './form'
import { capitalize, join } from './string'

export type BranchName = string
export type IssueId = string

export interface Branch {
  name: BranchName
  current?: boolean
  commit?: string
  label?: string
  description?: string
  issueId?: IssueId
  lastCheckout: number
  created: number
}

export interface FeatureBranch extends Branch {
  description: string
  issueId: IssueId
}

export function isFeatureBranch(branch?: Branch): branch is FeatureBranch {
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
    validate: (field: FormField) => {
      if (!field.value) {
        return 'required'
      }

      if (!env.issueRegex.exec(field.value)) {
        return `must be of form: ${env.issueRegex}`
      }
    },
    format: (value) => {
      return value?.replace(/\s+/g, '-').toUpperCase()
    },
  }),
  description: createFormField({
    label: 'Description',
    required: true,
    validate: (field: FormField) => {
      if (!field.value) {
        return 'required'
      }
    },
    format: (v?: string) => {
      return capitalize(v?.replace(/\s+/g, '_'))
    },
  }),
}

export function createFeatureBranch(form: FeatureBranchForm): FeatureBranch {
  throwValidationErrors(form)

  return {
    issueId: form.issueId.value ?? '',
    description: form.description.value ?? '',
    name: [
      'feature',
      form.issueId.value,
      form.description.value?.toLowerCase(),
    ].join('-'),
    lastCheckout: Date.now(),
    created: Date.now(),
  }
}

function parseBranchLabel(branch?: Branch) {
  const aheadMatch = /[ahead (\d+)]/.exec(branch?.label ?? '')
  const ahead = aheadMatch && aheadMatch[1]
  const behindMatch = /[behind (\d+)]/.exec(branch?.label ?? '')
  const behind = behindMatch && behindMatch[1]

  return branch?.label
    ?.replace(/[ahead (\d+)]/, chalk.green(`+ ${ahead}`))
    .replace(/[behind (\d+)]/, chalk.green(`- ${behind}`))
}

export function parseBranch(
  branch?: Branch
): FeatureBranch | Branch | undefined {
  if (branch) {
    const featureBranch = env.featureBranchRegex.exec(branch.name ?? '')
    if (featureBranch) {
      return {
        ...branch,
        // label: parseBranchLabel(branch),
        issueId: featureBranch[1].toUpperCase(),
        description: capitalize(featureBranch[2].replace(/_/g, ' ')),
        name: featureBranch[0],
      }
    }

    return { ...branch }
  }
}

export function parseBranchArgs(args: string[]) {
  const input = join(args, ' ')
  const commitMatch = env.commitRegex.exec(input)
  return {
    input,
    issueId: commitMatch ? commitMatch[0] : undefined,
    description: input.replace(/\s?jiraid:\s?([a-zA-Z]+-\d+)/i, ''),
  }
}
