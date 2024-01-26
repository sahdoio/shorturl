export interface TaskEntity {
  id: number
  name: string,
  description?: string
  statusId: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
