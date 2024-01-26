import { TaskEntity } from '../../../domain/entities/Task'
import { Result } from '../../../domain/protocols/result'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { FindTaskDto, ListTasksUc } from '../../../domain/useCases/task/list-tasks'
import { ok } from '../../helpers/result'
import { PaginatedResult } from '../../protocols/repositories/repository'
import { FindTaskRepository } from '../../protocols/repositories/task/find-task-repository'
import { Internationalization } from '../../protocols/utils/internationalization'

export class ListTasks implements ListTasksUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly findTaskRepository: FindTaskRepository
  ) { }

  async exec (data: FindTaskDto, opts?: UcOptions): Promise<Result<PaginatedResult<TaskEntity[]>>> {
    const { name, description, statusId } = data
    const result = await this.findTaskRepository.findAll({ name, description, statusId }, opts)
    return ok(this.i18n.t('FIND_TASK_SUCCESSFUL'), result)
  }
}
