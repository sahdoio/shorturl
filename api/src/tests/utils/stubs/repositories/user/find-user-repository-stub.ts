import { PaginatedResult } from '../../../../../app/data/protocols/repositories/repository'
import { FindUserRepository } from '../../../../../app/data/protocols/repositories/user/find-user-repository'
import { UserEntity } from '../../../../../app/domain/entities/User'
import { UcOptions } from '../../../../../app/domain/protocols/uc-options'
import { FindUserDto } from '../../../../../app/domain/useCases/user/find-user'
import { repositoryMetadataMock } from '../../../mocks/repository-metadata-mock'
import { userEntityMock } from '../../../mocks/user/user-entity-mock'
import { DbRepositoryStub } from '../db-repository-stub'

export class FindUserRepositoryStub extends DbRepositoryStub implements FindUserRepository {
  async findOne(data: FindUserDto, opts?: UcOptions, strictEmail?: boolean): Promise<UserEntity> {
    return userEntityMock
  }

  async findAll(data: FindUserDto, opts?: UcOptions): Promise<PaginatedResult<UserEntity[]>> {
    return {
      metadata: repositoryMetadataMock,
      payload: [userEntityMock]
    }
  }
}
