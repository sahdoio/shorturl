import { Repository } from '../repository'
import { LinkEntity } from '../../../../domain/entities/Link'
import { CreateTaskDto } from '../../../../domain/useCases/task/create-task'

export interface CreateLinkRepository extends Repository {
  exec: (data: CreateTaskDto) => Promise<LinkEntity>
}
