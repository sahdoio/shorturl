import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { LinkEntity } from '../../../domain/entities/Link'
import { UpdateLinkRepository, UpdateLinkRepositoryDto } from '../../../data/protocols/repositories/link/update-link-repository'
import { Link } from '../../database/entities/Link'

export class DbUpdateLinkRepository extends DbRepository implements UpdateLinkRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Link
  }

  async exec(id: number, data: UpdateLinkRepositoryDto): Promise<LinkEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(Link)
    // @ts-ignore
    return await repo.update(data, { where: { id } })
  }
}
