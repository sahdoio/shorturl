import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { TaskEntity } from '../../entities/Task'
import { Result } from '../../protocols/result'
import { UcOptions } from '../../protocols/uc-options'

export interface FindTaskDto {
  id?: number,
  name?: string
  description?: string
  statusId?: number
}

export interface ListTasksUc {
  exec: (user: FindTaskDto, opts?: UcOptions) => Promise<Result<PaginatedResult<TaskEntity[]>>>
}
