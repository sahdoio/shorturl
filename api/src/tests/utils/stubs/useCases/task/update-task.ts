import { Result } from '../../../../../app/domain/protocols/result'
import { UpdateTaskDto, UpdateTaskUc } from '../../../../../app/domain/useCases/task/update-task'
import { I18nStub } from '../../i18n-stub'

export class UpdateTaskUcStub implements UpdateTaskUc {
  async exec(id: number, data: UpdateTaskDto): Promise<Result<void>> {
    return {
      code: 200,
      data: null,
      msg: new I18nStub().t('UPDATE_TASK_SUCCESSFUL')
    }
  }
}
