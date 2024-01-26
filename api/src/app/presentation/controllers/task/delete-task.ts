import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { DeleteTaskUc } from '../../../domain/useCases/task/delete-task'
import { serverError, serverResponse } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeleteTaskController implements Controller {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: DeleteTaskUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { taskId } = httpRequest.params
      const res = await this.uc.exec({ id: taskId })
      return serverResponse(res)
    } catch (err) {
      this.log.error(err)
      return serverError()
    }
  }
}
