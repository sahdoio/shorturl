import { Table, Column, PrimaryKey, Model } from 'sequelize-typescript'
import { UserTaskEntity } from '../../../domain/entities/UserTask'

@Table({
  tableName: 'userTasks',
  timestamps: true
})

export class UserTask extends Model<UserTask> implements UserTaskEntity {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  userId: number

  @Column
  taskId: number
}
