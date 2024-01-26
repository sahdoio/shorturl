import { Result } from '../../../../../app/domain/protocols/result'
import { DeleteTaskDto, DeleteTaskUc } from '../../../../../app/domain/useCases/task/delete-task'
import { I18nStub } from '../../i18n-stub'

export class DeleteTaskUcStub implements DeleteTaskUc {
  async exec(data: DeleteTaskDto): Promise<Result<void>> {
    return {
      code: 200,
      data: null,
      msg: new I18nStub().t('DELETE_TASK_SUCCESSFUL')
    }
  }
}
