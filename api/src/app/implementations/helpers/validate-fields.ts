import { isNil } from 'lodash'
import { FieldValidator, ValidateNonEmptyFieldsResponseDto } from '../../data/protocols/utils/field-validator'

const isEmptyString = (value: string): boolean => {
  return typeof value === 'string' && value.trim().length === 0
}

export class PersonalFieldValidator implements FieldValidator {
  validate (mandatoryFields: string[], fields: any): ValidateNonEmptyFieldsResponseDto {
    let isValid = true
    const missingFields = []
    for (const field of mandatoryFields) {
      if (isNil(fields[field]) || isEmptyString(fields[field])) {
        isValid = false
        missingFields.push(field)
      }
    }

    return {
      success: isValid,
      missingFields
    }
  }
}
