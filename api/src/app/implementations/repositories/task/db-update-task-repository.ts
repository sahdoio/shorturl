import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { Task } from '../../database/entities/Task'
import { UpdateTaskRepository } from '../../../data/protocols/repositories/task/update-task-repository'
import { UpdateTaskDto } from '../../../domain/useCases/task/update-task'

export class DbUpdateTaskRepository extends DbRepository implements UpdateTaskRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Task
  }

  async exec(id: number, data: UpdateTaskDto): Promise<number[]> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Task)
    return await repo.update(data, { where: { id } })
  }
}
