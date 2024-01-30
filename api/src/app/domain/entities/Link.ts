import { LinkDetailsEntity } from './LinkDetails'

export interface LinkEntity {
  id: number
  url: string,
  urlHash: string,
  pageViews: number
  linkDetails: LinkDetailsEntity[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
