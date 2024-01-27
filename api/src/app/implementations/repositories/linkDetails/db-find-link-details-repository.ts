import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { FindUserDto } from '../../../domain/useCases/user/find-user'
import { DbRepository } from '../repository'
import { LinkDetails } from '../../database/entities/LinkDetails
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { Repository } from 'sequelize-typescript'
import {FindLinkDetailsRepository } from '../../../data/protocols/repositories/link-details/find-link-details-repository'
import { LinkDetailsEntity } from '../../../domain/entities/LinkDetails'

export class DbFindLinkDetailsRepository extends DbRepository implements FindLinkDetailsRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = LinkDetails
  }

  private async getRepo(): Promise<Repository<LinkDetails>> {
    const dbORMClient = await this.dbORM.getClient()
    return dbORMClient.getRepository(LinkDetails)
  }

  private getQueryData(data: FindUserDto) {
    const queryData: any = {}
    for (let key in data) {
      if (data[key]) {
        queryData[key] = data[key]
      }
    }
    return queryData
  }

  async findOne(data: FindUserDto, opts?: UcOptions): Promise<LinkDetailsEntity> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    return Object.keys(queryData).length > 0 ? await repo.findOne({ where: queryData }) : null
  }

  async findAll(data: FindUserDto, opts?: UcOptions): Promise<PaginatedResult<LinkDetailsEntity[]>> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    const setupPaginationData = await this.setupPagination(opts)
    const payload = await repo.findAll({ where: queryData, ...setupPaginationData })
    const metadata = await this.getMetadata(repo, queryData, opts)
    return { payload, metadata }
  }
}
