import { Result } from '../../../domain/protocols/result'
import { DeleteTaskDto, DeleteTaskUc } from '../../../domain/useCases/task/delete-task'
import { notFound, ok } from '../../helpers/result'
import { DeleteTaskRepository } from '../../protocols/repositories/task/delete-task-repository'
import { FindTaskRepository } from '../../protocols/repositories/task/find-task-repository'
import { Internationalization } from '../../protocols/utils/internationalization'

export class DeleteTask implements DeleteTaskUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly findTaskRepository: FindTaskRepository,
    private readonly deleteTaskRepository: DeleteTaskRepository
  ) { }

  async exec (data: DeleteTaskDto): Promise<Result<void>> {
    const { id } = data
    const task = await this.findTaskRepository.findOne({ id })
    if (!task) {
      return notFound(this.i18n.t('NOT_FOUND'))
    }
    await this.deleteTaskRepository.exec({ id })
    return ok(this.i18n.t('DELETE_TASK_SUCCESSFUL'))
  }
}
