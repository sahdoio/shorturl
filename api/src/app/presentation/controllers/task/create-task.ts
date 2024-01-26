import Config from '../../../../config/config'
import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { CreateTaskDto, CreateTaskUc } from '../../../domain/useCases/task/create-task'
import { serverError, serverResponse } from '../../helpers/http'
import { missingFields } from '../../helpers/response-builder'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateTaskController implements Controller {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: CreateTaskUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name']
      const validation = this.validator.validate(requiredFields, httpRequest.body)
      if (!validation.success) {
        return serverResponse(missingFields(validation.missingFields))
      }
      const { name, description } = httpRequest.body
      const data: CreateTaskDto = {
        name,
        description,
        statusId: Config.TASK_STATUS.TO_DO
      }
      const res = await this.uc.exec(data)
      return serverResponse(res)
    } catch (err) {
      this.log.error(err)
      return serverError()
    }
  }
}
