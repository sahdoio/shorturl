import { TaskEntity } from '../../../../../app/domain/entities/Task'
import { Result } from '../../../../../app/domain/protocols/result'
import { CreateTaskDto, CreateTaskUc } from '../../../../../app/domain/useCases/task/create-task'
import { taskEntityMock } from '../../../mocks/task/task-entity-mock'
import { I18nStub } from '../../i18n-stub'

export class CreateTaskUcStub implements CreateTaskUc {
  async exec(data: CreateTaskDto): Promise<Result<TaskEntity>> {
    return {
      code: 200,
      data: taskEntityMock,
      msg: new I18nStub().t('CREATE_TASK_SUCCESSFUL')
    }
  }
}
