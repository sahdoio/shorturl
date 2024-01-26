import { PaginatedResult, RepositoryMetadata } from '../../../../../app/data/protocols/repositories/repository'
import { FindTaskRepository } from '../../../../../app/data/protocols/repositories/task/find-task-repository'
import { TaskEntity } from '../../../../../app/domain/entities/Task'
import { UcOptions } from '../../../../../app/domain/protocols/uc-options'
import { FindTaskDto } from '../../../../../app/domain/useCases/task/list-tasks'
import { taskEntityMock } from '../../../mocks/task/task-entity-mock'
import { DbRepositoryStub } from '../db-repository-stub'

export class FindTaskRepositoryStub extends DbRepositoryStub implements FindTaskRepository {
  findOne(data: FindTaskDto, strictEmail?: boolean): Promise<TaskEntity> {
    return new Promise((resolve, reject) => {
      resolve(taskEntityMock)
    })
  }

  findAll(data: FindTaskDto, opts?: UcOptions): Promise<PaginatedResult<TaskEntity[]>> {
    return new Promise((resolve, reject) => {
      const payload = [taskEntityMock]
      const metadata: RepositoryMetadata = {
        totalOfRegisters: 1,
        totalOfPages: 1,
        currentPage: 1,
        itemsPerPage: 1
      }
      resolve({ payload, metadata })
    })
  }
}
