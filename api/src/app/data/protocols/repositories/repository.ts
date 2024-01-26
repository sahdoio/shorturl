import { UcOptions } from '../../../domain/protocols/uc-options'

export interface RepositoryMetadata {
  totalOfRegisters?: number
  totalOfPages?: number
  currentPage?: number
  itemsPerPage?: number
}

export interface SetupPaginationData {
  offset: number
  limit: number
}

export interface PaginatedResult<T> {
  payload: T
  metadata: RepositoryMetadata
}

export interface Repository {
  setupPagination (opts?: UcOptions): Promise<SetupPaginationData>
  getMetadata (repo: any, queryData: any, opts?: UcOptions): Promise<RepositoryMetadata>
}
