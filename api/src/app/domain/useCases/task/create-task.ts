import { TaskEntity } from '../../entities/Link'
import { Result } from '../../protocols/result'

export interface CreateTaskDto {
  name: string
  description?: string
  statusId: number
}

export interface CreateTaskUc {
  exec: (data: CreateTaskDto) => Promise<Result<TaskEntity>>
}
