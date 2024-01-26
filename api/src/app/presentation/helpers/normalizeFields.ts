export const convertToBoolean = (item: any): boolean | null => {
    switch (true) {
      case item === '1':
      case item === 1:
      case item === 'true':
      case item === true:
        return true
      case item === '0':
      case item === 0:
      case item === 'false':
      case item === false:
        return false
      default:
        return null
    }
  }
  