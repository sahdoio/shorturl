export interface UcOptions {
  orderBy?: string | string[]
  isOrderByDesc?: boolean | string
  itemsPerPage?: number
  currentPage?: number
  fields?: string[]
  forceHiddenFields?: boolean
}
