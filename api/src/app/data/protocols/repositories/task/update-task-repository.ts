import { Repository } from '../repository'
import { TaskEntity } from '../../../../domain/entities/Task'
import { UpdateTaskDto } from '../../../../domain/useCases/task/update-task'

export interface UpdateTaskRepository extends Repository {
  exec: (id: number, data: UpdateTaskDto) => Promise<number[]>
}
