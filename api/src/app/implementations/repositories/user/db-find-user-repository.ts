import { FindUserRepository } from '../../../data/protocols/repositories/user/find-user-repository'
import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { UserEntity } from '../../../domain/entities/User'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { FindUserDto } from '../../../domain/useCases/user/find-user'
import { DbRepository } from '../repository'
import { User } from '../../database/entities/User'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { Repository } from 'sequelize-typescript'

export class DbFindUserRepository extends DbRepository implements FindUserRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = User
  }

  private async getRepo(): Promise<Repository<User>> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(User)
    return repo
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

  async findOne(data: FindUserDto, opts?: UcOptions): Promise<UserEntity> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    const payload = Object.keys(queryData).length > 0 ? await repo.findOne({ where: queryData }) : null
    return payload
  }

  async findAll(data: FindUserDto, opts?: UcOptions): Promise<PaginatedResult<UserEntity[]>> {
    const repo = await this.getRepo()
    const queryData = this.getQueryData(data)
    const setupPaginationData = await this.setupPagination(opts)
    const payload = await repo.findAll({ where: queryData, ...setupPaginationData })
    const metadata = await this.getMetadata(repo, queryData, opts)
    return { payload, metadata }
  }
}
