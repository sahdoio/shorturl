export interface ValidateNonEmptyFieldsResponseDto {
  success: boolean
  missingFields?: string[]
}

export interface FieldValidator {
  validate: (mandatoryFields: string[], fields: any) => ValidateNonEmptyFieldsResponseDto
}
