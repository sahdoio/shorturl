// noinspection JSAnnotator

import { Table, Column, PrimaryKey, Model, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { LinkDetailsEntity } from '../../../domain/entities/LinkDetails'
import { Link } from './Link'
import { LinkEntity } from '../../../domain/entities/Link'

@Table({
  tableName: 'linkDetails',
  timestamps: false
})

export class LinkDetails extends Model<LinkDetails> implements LinkDetailsEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @ForeignKey(() => Link)
  @Column
  linkId: number

  @Column
  name: string

  @Column
  value: string

  @BelongsTo(() => Link)
  link: LinkEntity;
}
