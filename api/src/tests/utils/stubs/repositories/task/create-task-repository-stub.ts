import { CreateTaskRepository } from '../../../../../app/data/protocols/repositories/task/create-task-repository'
import { TaskEntity } from '../../../../../app/domain/entities/Task'
import { CreateTaskDto } from '../../../../../app/domain/useCases/task/create-task'
import { taskEntityMock } from '../../../mocks/task/task-entity-mock'
import { DbRepositoryStub } from '../db-repository-stub'

export class CreateTaskRepositoryStub extends DbRepositoryStub implements CreateTaskRepository {
  async exec (data: CreateTaskDto): Promise<TaskEntity> {
    return taskEntityMock
  }
}
