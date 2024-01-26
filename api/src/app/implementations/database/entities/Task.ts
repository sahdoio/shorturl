import { Table, Column, PrimaryKey, Model, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'
import { TaskEntity } from '../../../domain/entities/Task'

@Table({
  tableName: 'tasks',
  timestamps: true
})

export class Task extends Model<Task> implements TaskEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string  
  
  @Column
  description?: string

  @Column
  statusId: number

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
