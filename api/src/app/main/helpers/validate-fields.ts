import { ValidateNonEmptyFieldsResponseDto } from '../../data/protocols/utils/field-validator'

export const validateNonEmptyFields = (mandatoryFields: string[], fields: any): ValidateNonEmptyFieldsResponseDto => {
  let isValid = true
  const missingFields = []
  for (const field of mandatoryFields) {
    if (!fields[field]) {
      isValid = false
      missingFields.push(fields[field])
    }
  }

  return {
    success: isValid,
    missingFields
  }
}
