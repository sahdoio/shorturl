import { DeleteTaskRepository } from '../../../../../app/data/protocols/repositories/task/delete-task-repository'
import { DeleteTaskDto } from '../../../../../app/domain/useCases/task/delete-task'
import { DbRepositoryStub } from '../db-repository-stub'

export class DeleteTaskRepositoryStub extends DbRepositoryStub implements DeleteTaskRepository {
  exec(data: DeleteTaskDto): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  }
}
