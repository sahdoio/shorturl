import { DbRepositoryStub } from '../db-repository-stub'
import { linkEntityMock } from '../../../mocks/link/link-entity-mock'
import { LinkEntity } from '../../../../../app/domain/entities/Link'
import { UpdateLinkRepository, UpdateLinkRepositoryDto } from '../../../../../app/data/protocols/repositories/link/update-link-repository'

export class DbUpdateLinkRepositoryStub extends DbRepositoryStub implements UpdateLinkRepository {
  async exec(id: number, data: UpdateLinkRepositoryDto): Promise<LinkEntity> {
    return new Promise((resolve, reject) => {
      resolve(linkEntityMock)
    })
  }
}
