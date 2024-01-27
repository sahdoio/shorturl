import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { LinkEntity } from '../../../domain/entities/Link'
import { CreateLinkRepository } from '../../../data/protocols/repositories/link/create-link-repository'
import { CreateTaskDto } from '../../../domain/useCases/task/create-task'
import { Link } from '../../database/entities/Link'

export class DbCreateLinkRepository extends DbRepository implements CreateLinkRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Link
  }

  async exec(data: CreateTaskDto): Promise<LinkEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Link)
    return (await repo.create(data)).get()
  }
}
