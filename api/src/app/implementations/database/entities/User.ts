import { Table, Column, PrimaryKey, Model, CreatedAt, UpdatedAt, DeletedAt, Scopes } from 'sequelize-typescript'
import { UserEntity } from '../../../domain/entities/User'

@Table({
  tableName: 'users',
  timestamps: true
})

export class User extends Model<User> implements UserEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  email: string

  @Column
  firstName?: string

  @Column
  lastName?: string

  @Column
  phoneNumber: string

  @Column
  password: string

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
