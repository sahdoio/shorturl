import { Repository } from '../repository'
import { DeleteTaskDto } from '../../../../domain/useCases/task/delete-task'

export interface DeleteTaskRepository extends Repository {
  exec: (data: DeleteTaskDto) => Promise<number>
}
