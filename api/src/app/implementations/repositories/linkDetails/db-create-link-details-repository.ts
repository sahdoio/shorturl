import { LinkDetailsEntity } from '../../../domain/entities/LinkDetails'
import { DbRepository } from '../repository'
import { LinkDetails } from '../../database/entities/LinkDetails'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { CreateLinkDetailsRepository, CreateLinkDetailsRepositoryDto } from '../../../data/protocols/repositories/link-details/create-link-details-repository'

export class DbCreateLinkDetailsRepository extends DbRepository implements CreateLinkDetailsRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = LinkDetails
  }

  async exec(data: CreateLinkDetailsRepositoryDto): Promise<LinkDetailsEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(LinkDetails)
    // @ts-ignore
    return (await repo.create(data)).get()
  }
}
