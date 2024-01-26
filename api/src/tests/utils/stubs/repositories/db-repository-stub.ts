import { Repository, RepositoryMetadata, SetupPaginationData } from '../../../../app/data/protocols/repositories/repository'
import { UcOptions } from '../../../../app/domain/protocols/uc-options'
import { repositoryMetadataMock } from '../../mocks/repository-metadata-mock'
import { repositorySetupPaginationDataMock } from '../../mocks/repository-setup-pagination-mock'

export class DbRepositoryStub implements Repository {
  async setupPagination (opts?: UcOptions): Promise<SetupPaginationData> {
    return new Promise((resolve, reject) => {
      resolve(repositorySetupPaginationDataMock)
    })
  }

  getMetadata(repo: any, queryData: any, opts?: UcOptions): Promise<RepositoryMetadata> {
    return new Promise((resolve, reject) => {
      resolve(repositoryMetadataMock)
    })
  }
}
