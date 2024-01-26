import { Repository } from '../repository'
import { TaskEntity } from '../../../../domain/entities/Task'
import { CreateTaskDto } from '../../../../domain/useCases/task/create-task'

export interface CreateTaskRepository extends Repository {
  exec: (data: CreateTaskDto) => Promise<TaskEntity>
}
