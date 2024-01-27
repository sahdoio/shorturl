import { PaginatedResult, Repository } from '../repository'
import { LinkEntity } from '../../../../domain/entities/Link'
import { FindTaskDto } from '../../../../domain/useCases/task/list-tasks'
import { UcOptions } from '../../../../domain/protocols/uc-options'

export interface FindLinkRepository extends Repository {
  findOne: (data: FindTaskDto, strictEmail?: boolean) => Promise<LinkEntity>
  findAll: (data: FindTaskDto, opts?: UcOptions) => Promise<PaginatedResult<LinkEntity[]>>
}
