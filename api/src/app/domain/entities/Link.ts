export interface LinkEntity {
  id: number
  url: string,
  urlHash: string,
  pageViews: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
