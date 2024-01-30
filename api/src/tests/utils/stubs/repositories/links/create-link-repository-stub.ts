import { DbRepositoryStub } from '../db-repository-stub'
import { CreateLinkRepository, CreateLinkRepositoryDto } from '../../../../../app/data/protocols/repositories/link/create-link-repository'
import { LinkEntity } from '../../../../../app/domain/entities/Link'
import { linkEntityMock } from '../../../mocks/link/link-entity-mock'

export class CreateLinkRepositoryStub extends DbRepositoryStub implements CreateLinkRepository {
  async exec (data: CreateLinkRepositoryDto): Promise<LinkEntity> {
    return linkEntityMock
  }
}
