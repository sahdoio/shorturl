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

  async setupPagination(opts?: UcOptions): Promise<SetupPaginationData> {
    const itemsPerPage = opts?.itemsPerPage || this.defaultItemsPerPage
    const currentPage = opts?.currentPage || this.defaultCurrentPage
    const setupPaginationData = {
      offset: itemsPerPage * (currentPage - 1),
      limit: itemsPerPage
    }
    let orderBySetup: any[]
    opts.isOrderByDesc = convertToBoolean(opts.isOrderByDesc)
    if (opts.orderBy) {
      if (Array.isArray(opts.orderBy)) {
        orderBySetup = [...this.getOrderByList(opts)]
      } else {
        orderBySetup = [...this.getOrderBy(opts)]
      }
    }
    if (orderBySetup.length > 0) {
      setupPaginationData['order'] = orderBySetup
    }
    return setupPaginationData
  }

  async getMetadata(repo: any, queryData: any, opts?: UcOptions): Promise<RepositoryMetadata> {
    const total = await repo.count({ where: queryData })
    const itemsPerPage = opts?.itemsPerPage || this.defaultItemsPerPage
    const currentPage = opts?.currentPage || this.defaultCurrentPage
    return {
      totalOfRegisters: total,
      totalOfPages: Math.ceil(total / itemsPerPage),
      itemsPerPage: itemsPerPage,
      currentPage: currentPage
    }
  }

  private getOrderBy(opts): any[] {
    const orderBySetup = [];
    orderBySetup.push(opts.orderBy)
    if (opts.isOrderByDesc) {
      orderBySetup.push('DESC')
    } else {
      orderBySetup.push('ASC')
    }
    return [orderBySetup];
  }

  private getOrderByList(opts): any[] {
    const orderByList = []
    opts.orderBy.forEach((orderByItem: string) => {
      const currentOrderByItem = []
      currentOrderByItem.push(orderByItem)
      if (opts.isOrderByDesc) {
        currentOrderByItem.push('DESC')
      } else {
        currentOrderByItem.push('ASC')
      }
      orderByList.push(currentOrderByItem)
    })
    return orderByList;
  }
}
