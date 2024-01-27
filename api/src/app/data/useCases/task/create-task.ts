import { TaskEntity } from '../../../domain/entities/Link'
import { Result } from '../../../domain/protocols/result'
import { CreateTaskDto, CreateTaskUc } from '../../../domain/useCases/task/create-task'
import { ok } from '../../helpers/result'
import { CreateLinkRepository } from '../../protocols/repositories/task/create-link-repository'
import { Internationalization } from '../../protocols/utils/internationalization'

export class CreateTask implements CreateTaskUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly createTaskRepository: CreateLinkRepository
  ) { }

  async exec (data: CreateTaskDto): Promise<Result<TaskEntity>> {
    const { name, description, statusId } = data
    const task = await this.createTaskRepository.exec({ name, description, statusId })
    return ok(this.i18n.t('CREATE_TASK_SUCCESSFUL'), task)
  }
}
