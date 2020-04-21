import { FormField, FormFields } from '../components/Form'

export function createFormField(field: FormField): FormField {
  return field
}

export function throwValidationErrors(form: FormFields) {
  Object.keys(form).forEach((key) => {
    const field = form[key]
    const validationError = field.validate(field)

    if (validationError) {
      throw new Error(validationError)
    }
  })
}
