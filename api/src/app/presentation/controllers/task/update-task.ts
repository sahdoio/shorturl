import Config from '../../../../config/config'
import { unprocessableEntity } from '../../../data/helpers/result'
import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { UpdateTaskUc } from '../../../domain/useCases/task/update-task'
import { serverError, serverResponse } from '../../helpers/http'
import { missingFields } from '../../helpers/response-builder'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdateTaskController implements Controller {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: UpdateTaskUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['statusId']
      const validation = this.validator.validate(requiredFields, httpRequest.body)
      if (!validation.success) {
        return serverResponse(missingFields(validation.missingFields))
      }
      const { taskId } = httpRequest.params
      const { statusId } = httpRequest.body
      const availableStatus = [
        Config.TASK_STATUS.TO_DO,
        Config.TASK_STATUS.IN_PROGRESS,
        Config.TASK_STATUS.DONE,
        Config.TASK_STATUS.ARCHIVED
      ]
      if (!availableStatus.includes(statusId)) {
        return serverResponse(unprocessableEntity())
      }
      const res = await this.uc.exec(taskId, { statusId })
      return serverResponse(res)
    } catch (err) {
      this.log.error(err)
      return serverError()
    }
  }
}
