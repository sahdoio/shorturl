import { LinkEntity } from "../../../../app/domain/entities/Link"

export const linkEntityMock: LinkEntity = {
  id: 1,
  url: 'https://sahdo.io',
  urlHash: '60m7cB',
  pageViews: 100,
  linkDetails: [],
  createdAt: new Date(),
  updatedAt: new Date()
}
