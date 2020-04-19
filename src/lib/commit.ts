import { FormField, FormFields } from '../components/Form'
import { featureBranchForm } from './branch'
import { createFormField } from './form'

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
    sanitize: (field: FormField) => {
      if (!field.value) {
        throw new Error('Message required')
      }

      return field.value.toLowerCase()
    },
  }),
}

export function createCommit(form: CommitForm): Commit {
  const issueId = form.issueId.sanitize(form.issueId)
  const message = form.message.sanitize(form.message)

  return {
    issueId,
    description: message,
    message: `${message} JIRAID: ${issueId}`.replace(/  +/g, ' '),
  }
}
