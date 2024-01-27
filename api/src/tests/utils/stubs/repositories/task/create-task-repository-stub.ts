import { CreateLinkRepository } from '../../../../../app/data/protocols/repositories/task/create-link-repository'
import { TaskEntity } from '../../../../../app/domain/entities/Link'
import { CreateTaskDto } from '../../../../../app/domain/useCases/task/create-task'
import { taskEntityMock } from '../../../mocks/task/task-entity-mock'
import { DbRepositoryStub } from '../db-repository-stub'

export class CreateTaskRepositoryStub extends DbRepositoryStub implements CreateLinkRepository {
  async exec (data: CreateTaskDto): Promise<TaskEntity> {
    return taskEntityMock
  }
}
