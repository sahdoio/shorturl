import { LinkDetailsEntity } from '../../../app/domain/entities/LinkDetails'
import { linkEntityMock } from './link/link-entity-mock'

export const linkDetailsEntityMock: LinkDetailsEntity = {
  id: 1,
  linkId: linkEntityMock.id,
  name: 'title',
  value: 'Sahdo Webiste',
  link: linkEntityMock
}
