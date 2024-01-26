import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { TaskEntity } from '../../../domain/entities/Task'
import { CreateTaskRepository } from '../../../data/protocols/repositories/task/create-task-repository'
import { CreateTaskDto } from '../../../domain/useCases/task/create-task'
import { Task } from '../../database/entities/Task'

export class DbCreateTaskRepository extends DbRepository implements CreateTaskRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Task
  }

  async exec(data: CreateTaskDto): Promise<TaskEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Task)
    return (await repo.create(data)).get()
  }
}
