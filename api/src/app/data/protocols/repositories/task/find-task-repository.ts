import { PaginatedResult, Repository } from '../repository'
import { TaskEntity } from '../../../../domain/entities/Task'
import { FindTaskDto } from '../../../../domain/useCases/task/list-tasks'
import { UcOptions } from '../../../../domain/protocols/uc-options'

export interface FindTaskRepository extends Repository {
  findOne: (data: FindTaskDto, strictEmail?: boolean) => Promise<TaskEntity>
  findAll: (data: FindTaskDto, opts?: UcOptions) => Promise<PaginatedResult<TaskEntity[]>>
}
