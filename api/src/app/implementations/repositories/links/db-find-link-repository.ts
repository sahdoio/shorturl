import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { DbRepository } from '../repository'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { Repository } from 'sequelize-typescript'
import { Op } from 'sequelize'
import { FindLinkDto, FindLinkRepository } from '../../../data/protocols/repositories/link/find-link-repository'
import { Link } from '../../database/entities/Link'
import { LinkEntity } from '../../../domain/entities/Link'

export class DbFindLinkRepository extends DbRepository implements FindLinkRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = Link
  }

  private async getRepo(): Promise<Repository<Link>> {
    const dbORMClient = await this.dbORM.getClient()
    return dbORMClient.getRepository(Link)
  }

  private getQueryData(data: FindLinkDto): any {
    const queryData: any = {}
    const likeAttributes = ['url']
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

  async findOne(data: FindLinkDto): Promise<LinkEntity> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    return Object.keys(queryData).length > 0 ? await repo.findOne({ where: queryData }) : null
  }

  async findAll(data: FindLinkDto, opts?: UcOptions): Promise<PaginatedResult<LinkEntity[]>> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    const setupPaginationData = await this.setupPagination(opts)
    const payload = await repo.findAll({ where: queryData, ...setupPaginationData })
    const metadata = await this.getMetadata(repo, queryData, opts)
    return { payload, metadata }
  }
}
