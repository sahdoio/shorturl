import { CreateUserRepository } from '../../../../../app/data/protocols/repositories/user/create-user-repository'
import { UserEntity } from '../../../../../app/domain/entities/User'
import { CreateUserDto } from '../../../../../app/domain/useCases/user/create-user'
import { userEntityMock } from '../../../mocks/user/user-entity-mock'
import { DbRepositoryStub } from '../db-repository-stub'

export class CreateUserRepositoryStub extends DbRepositoryStub implements CreateUserRepository {
  async exec (data: CreateUserDto): Promise<UserEntity> {
    return userEntityMock
  }
}
