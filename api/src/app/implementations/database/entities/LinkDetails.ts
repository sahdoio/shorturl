// noinspection JSAnnotator

import { Table, Column, PrimaryKey, Model } from 'sequelize-typescript'
import { LinkDetailsEntity } from '../../../domain/entities/LinkDetails'

@Table({
  tableName: 'linkDetails',
  timestamps: true
})

export class LinkDetails extends Model<LinkDetails> implements LinkDetailsEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  linkId: number

  @Column
  name: string

  @Column
  value: string
}
