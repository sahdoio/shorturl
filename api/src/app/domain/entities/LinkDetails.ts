import { LinkEntity } from './Link'

export interface LinkDetailsEntity {
  id: number
  linkId: number,
  name: string
  value: string
  link: LinkEntity
}
