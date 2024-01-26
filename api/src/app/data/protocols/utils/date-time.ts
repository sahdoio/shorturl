export interface GbDateTime {
  currentDate: () => string
  currentUTCDate: () => string
  add: (date: string, metric: string, value: number, isUTC?: boolean) => string
  subtract: (date: string, metric: string, value: number, isUTC?: boolean) => string
  isBefore: (dt1: string, dt2: string) => boolean
  isAfter: (dt1: string, dt2: string) => boolean
  isBeforeOrSame: (dt1: string, dt2: string) => boolean
  isAfterOrSame: (dt1: string, dt2: string) => boolean
  addMonth: (monthSum: number) => Date
  addYear: (yearSum: number) => Date
  format: (date: string, format: string) => string
}
