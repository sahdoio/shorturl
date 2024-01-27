import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { LinkEntity } from '../../../domain/entities/Link'
import {
  CreateLinkRepository,
  CreateLinkRepositoryDto
} from '../../../data/protocols/repositories/link/create-link-repository'
import { Link } from '../../database/entities/Link'

export class DbCreateLinkRepository extends DbRepository implements CreateLinkRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Link
  }

  async exec(data: CreateLinkRepositoryDto): Promise<LinkEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Link)
    // @ts-ignore
    return (await repo.create({ ...data, pageViews: data.pageViews ?? 0 })).get()
  }
}
