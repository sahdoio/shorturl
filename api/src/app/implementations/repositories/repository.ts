/* istanbul ignore file */
/*
  This file is ignored by test because many repositories uses the validateUnique method, but JEST don't count this on its coverage, but this file is already tested by another test cases.
  Also, this is a abstract class, thus, it's not possible instantiate it for unit tests
*/
import env from '../../../env'
import { Repository, RepositoryMetadata, SetupPaginationData } from '../../data/protocols/repositories/repository'
import { UcOptions } from '../../domain/protocols/uc-options'
import { convertToBoolean } from '../../presentation/helpers/normalizeFields'

export abstract class DbRepository implements Repository {
  protected entity: any
  protected defaultItemsPerPage = env.paginatedResult.defaultItemsPerPage
  protected defaultCurrentPage = env.paginatedResult.defaultCurrentPage

  async setupPagination (opts?: UcOptions): Promise<SetupPaginationData> {
    const itemsPerPage = opts?.itemsPerPage || this.defaultItemsPerPage
    const currentPage = opts?.currentPage || this.defaultCurrentPage
    const setupPaginationData = {
      offset:  itemsPerPage * (currentPage - 1),
      limit: itemsPerPage
    }
    const orderBySetup = []
    opts.isOrderByDesc = convertToBoolean(opts.isOrderByDesc)
    if (opts.orderBy) {
      orderBySetup.push(opts.orderBy)
      if (opts.isOrderByDesc) {
        orderBySetup.push('DESC')
      } else {
        orderBySetup.push('ASC')
      }
    }
    if (orderBySetup.length > 0) {
      setupPaginationData['order'] = [orderBySetup]
    }
    return setupPaginationData
  } 

  async getMetadata (repo: any, queryData: any, opts?: UcOptions): Promise<RepositoryMetadata> {
    const total = await repo.count({ where: queryData})
    const itemsPerPage = opts?.itemsPerPage || this.defaultItemsPerPage
    const currentPage = opts?.currentPage || this.defaultCurrentPage
    return {
      totalOfRegisters: total,
      totalOfPages: Math.ceil(total / itemsPerPage),
      itemsPerPage: itemsPerPage,
      currentPage: currentPage
    }
  } 
}
