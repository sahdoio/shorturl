import { FindLinkRepositoryDto, FindLinkRepository } from '../../../../../app/data/protocols/repositories/link/find-link-repository'
import { DbRepositoryStub } from '../db-repository-stub'
import { LinkEntity } from '../../../../../app/domain/entities/Link'
import { UcOptions } from '../../../../../app/domain/protocols/uc-options'
import { PaginatedResult } from '../../../../../app/data/protocols/repositories/repository'
import { linkEntityMock } from '../../../mocks/link/link-entity-mock'
import { repositoryMetadataMock } from '../../../mocks/repository-metadata-mock'

export class DbFindLinkRepositoryStub extends DbRepositoryStub implements FindLinkRepository {
  async findOne(data: FindLinkRepositoryDto): Promise<LinkEntity> {
    return linkEntityMock
  }

  async findAll(data: FindLinkRepositoryDto, opts?: UcOptions): Promise<PaginatedResult<LinkEntity[]>> {
    return {
      metadata: repositoryMetadataMock,
      payload: [linkEntityMock, linkEntityMock, linkEntityMock]
    }
  }
}
