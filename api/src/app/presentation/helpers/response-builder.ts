export const missingFields = (missingFields: string[]): any => ({
  code: 422,
  msg: `Missing fields: ${missingFields.join(', ')}`,
  data: null
})
