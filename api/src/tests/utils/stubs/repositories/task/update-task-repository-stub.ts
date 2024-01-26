import { UpdateTaskRepository } from '../../../../../app/data/protocols/repositories/task/update-task-repository'
import { UpdateTaskDto } from '../../../../../app/domain/useCases/task/update-task'
import { DbRepositoryStub } from '../db-repository-stub'

export class UpdateTaskRepositoryStub extends DbRepositoryStub implements UpdateTaskRepository {
  exec(id: number, data: UpdateTaskDto): Promise<number[]> {
    return new Promise((resolve, reject) => {
      resolve([1])
    })
  }
}
