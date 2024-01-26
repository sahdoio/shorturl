import { Table, Column, PrimaryKey, Model, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'
import { TaskStatusEntity } from '../../../domain/entities/TaskStatus'

@Table({
  tableName: 'taskStatus',
  timestamps: true
})

export class TaskStatus extends Model<TaskStatus> implements TaskStatusEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @Column
  password: string

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
