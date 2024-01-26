import { UserEntity } from '../../../domain/entities/User'
import { DbRepository } from '../repository'
import { User } from '../../database/entities/User'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { CreateUserRepository } from '../../../data/protocols/repositories/user/create-user-repository'
import { CreateUserDto } from '../../../domain/useCases/user/create-user'

export class DbCreateUserRepository extends DbRepository implements CreateUserRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    this.entity = User
  }

  async exec(data: CreateUserDto): Promise<UserEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const repo = await dbORMClient.getRepository(User)
    return (await repo.create(data)).get()
  }
}
