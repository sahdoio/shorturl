import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { Task } from '../../database/entities/Task'
import { DeleteTaskDto } from '../../../domain/useCases/task/delete-task'
import { DeleteTaskRepository } from '../../../data/protocols/repositories/task/delete-task-repository'

export class DbDeleteTaskRepository extends DbRepository implements DeleteTaskRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Task
  }

  private getQueryData(data: DeleteTaskDto): any {
    const queryData: any = {}
    for (let key in data) {
      if (data[key]) {     
          queryData[key] = data[key]        
      }
    }
    return queryData
  }

  async exec(data: DeleteTaskDto): Promise<number> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Task)
    const queryData = this.getQueryData(data)
    return await repo.destroy({ where: queryData })
  }
}
