export interface UserEntity {
  id: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
