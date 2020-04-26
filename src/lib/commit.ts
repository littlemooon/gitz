import { FormField, FormFields } from '../components/Form'
import { featureBranchForm } from './branch'
import { createFormField, throwValidationErrors } from './form'
import { join, reduceWhitespace } from './string'

export interface Commit {
  issueId: string
  description: string
  message: string
}

export interface CommitForm extends FormFields {
  issueId: FormField
  message: FormField
}

export const commitForm: CommitForm = {
  issueId: createFormField(featureBranchForm.issueId),
  message: createFormField({
    label: 'Message',
    required: true,
    validate: (field: FormField) => {
      if (!field.value) {
        return 'required'
      }
    },
    format: (v?: string) => {
      return v?.toLowerCase()
    },
  }),
}

export function createCommit(form: CommitForm): Commit {
  throwValidationErrors(form)

  return {
    issueId: form.issueId.value ?? '',
    description: form.message.value ?? '',
    message: reduceWhitespace(
      `${form.message.value} JIRAID: ${form.issueId.value}`
    ),
  }
}

export function parseCommitArgs(args: string[]) {
  const input = join(args, ' ')
  const issueMatch = /[a-zA-Z]+-\d+/g.exec(input)
  return {
    issueId: commitForm.issueId.format(issueMatch ? issueMatch[0] : undefined),
    message: commitForm.message.format(input),
  }
}
