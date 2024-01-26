import { Result } from '../../protocols/result'

export interface DeleteTaskDto {
  id: number
}

export interface DeleteTaskUc {
  exec: (data: DeleteTaskDto) => Promise<Result<void>>
}
