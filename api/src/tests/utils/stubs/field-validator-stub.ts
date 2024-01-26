import { FieldValidator, ValidateNonEmptyFieldsResponseDto } from '../../../app/data/protocols/utils/field-validator'

export class FieldValidatorStub implements FieldValidator {
  validate (mandatoryFields: string[], fields: any): ValidateNonEmptyFieldsResponseDto {
    return {
      success: true,
      missingFields: []
    }
  }
}
