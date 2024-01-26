import { Result } from '../../protocols/result'

export interface UpdateTaskDto {
  statusId: number
}

export interface UpdateTaskUc {
  exec: (id: number, data: UpdateTaskDto) => Promise<Result<void>>
}
