import { PaginatedResult } from '../../../../../app/data/protocols/repositories/repository'
import { TaskEntity } from '../../../../../app/domain/entities/Task'
import { Result } from '../../../../../app/domain/protocols/result'
import { FindTaskDto, ListTasksUc } from '../../../../../app/domain/useCases/task/list-tasks'
import { findAllTasksMock } from '../../../mocks/task/find-all-tasks-mock'
import { I18nStub } from '../../i18n-stub'

export class ListTasksUcStub implements ListTasksUc {
  async exec(data: FindTaskDto): Promise<Result<PaginatedResult<TaskEntity[]>>> {
    return {
      code: 200,
      data: findAllTasksMock,
      msg: new I18nStub().t('FIND_TASK_SUCCESSFUL')
    }
  }
}
