import { Result } from '../../../domain/protocols/result'
import { UpdateTaskDto, UpdateTaskUc } from '../../../domain/useCases/task/update-task'
import { notFound, ok } from '../../helpers/result'
import { FindTaskRepository } from '../../protocols/repositories/task/find-task-repository'
import { UpdateTaskRepository } from '../../protocols/repositories/task/update-task-repository'
import { Internationalization } from '../../protocols/utils/internationalization'

export class UpdateTask implements UpdateTaskUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly findTaskRepository: FindTaskRepository,
    private readonly updateTaskRepository: UpdateTaskRepository
  ) { }

  async exec (id: number, data: UpdateTaskDto): Promise<Result<void>> {    
    const task = await this.findTaskRepository.findOne({ id })
    if (!task) {
      return notFound(this.i18n.t('NOT_FOUND'))
    }
    await this.updateTaskRepository.exec(id, data)
    return ok(this.i18n.t('UPDATE_TASK_SUCCESSFUL'))
  }
}
