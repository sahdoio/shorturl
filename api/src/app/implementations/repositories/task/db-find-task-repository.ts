import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { FindTaskRepository } from '../../../data/protocols/repositories/task/find-task-repository'
import { Task } from '../../database/entities/Task'
import { Repository } from 'sequelize-typescript'
import { Op } from 'sequelize'
import { TaskEntity } from '../../../domain/entities/Task'
import { FindTaskDto } from '../../../domain/useCases/task/list-tasks'

export class DbFindTaskRepository extends DbRepository implements FindTaskRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Task
  }

  private async getRepo(): Promise<Repository<Task>> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Task)
    return repo
  }

  private getQueryData(data: FindTaskDto): any {
    const queryData: any = {}
    const likeAttributes = ['name', 'description']
    for (let key in data) {
      if (data[key]) {
        if (likeAttributes.includes(key)) {
          queryData[key] = { [Op.like]: '%' + data[key] + '%' }
        } else {
          queryData[key] = data[key]
        }
      }
    }
    return queryData
  }

  async findOne(data: FindTaskDto): Promise<TaskEntity> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    const payload = Object.keys(queryData).length > 0 ? await repo.findOne({ where: queryData }) : null
    return payload
  }

  async findAll(data: FindTaskDto, opts?: UcOptions): Promise<PaginatedResult<TaskEntity[]>> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    const setupPaginationData = await this.setupPagination(opts)
    const payload = await repo.findAll({ where: queryData, ...setupPaginationData })
    const metadata = await this.getMetadata(repo, queryData, opts)
    return { payload, metadata }
  }
}
