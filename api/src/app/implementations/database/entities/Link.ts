// noinspection JSAnnotator

import { Table, Column, PrimaryKey, Model, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'
import { LinkEntity } from '../../../domain/entities/Link'

@Table({
  tableName: 'links',
  timestamps: true
})

export class Link extends Model<Link> implements LinkEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  url: string

  @Column
  urlHash: string

  @Column
  pageViews: number

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
