import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { FindTaskDto, ListTasksUc } from '../../../domain/useCases/task/list-tasks'
import { serverError, serverResponse } from '../../helpers/http'
import { makeUcOptions } from '../../helpers/uc-options'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ListTasksController implements Controller {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: ListTasksUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, description, statusId } = httpRequest.body
      const data: FindTaskDto = {
        name,
        description,
        statusId
      }
      const ucOptions = makeUcOptions(httpRequest)
      const res = await this.uc.exec(data, ucOptions)
      return serverResponse(res)
    } catch (err) {
      this.log.error(err)
      return serverError()
    }
  }
}
