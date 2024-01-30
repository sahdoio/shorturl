import { DbRepositoryStub } from '../db-repository-stub'
import { LinkDetailsEntity } from '../../../../../app/domain/entities/LinkDetails'
import { linkDetailsEntityMock } from '../../../mocks/link-details-mock'
import { CreateLinkDetailsRepository, CreateLinkDetailsRepositoryDto } from '../../../../../app/data/protocols/repositories/link-details/create-link-details-repository'

export class CreateLinkDetailsRepositoryStub extends DbRepositoryStub implements CreateLinkDetailsRepository {
  async exec (data: CreateLinkDetailsRepositoryDto): Promise<LinkDetailsEntity> {
    return linkDetailsEntityMock
  }
}
