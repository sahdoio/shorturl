import { DeleteTask } from '../../../../data/useCases/task/delete-task'
import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbDeleteTaskRepository } from '../../../../implementations/repositories/task/db-delete-task-repository'
import { DbFindTaskRepository } from '../../../../implementations/repositories/task/db-find-task-repository'
import { DeleteTaskController } from '../../../../presentation/controllers/task/delete-task'

export const makeDeleteTaskController = (): DeleteTaskController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const findTaskRepository = new DbFindTaskRepository(dbORM)
  const deleteTaskRepository = new DbDeleteTaskRepository(dbORM)
  const uc = new DeleteTask(i18n, findTaskRepository, deleteTaskRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  const controller = new DeleteTaskController(validator, log, uc)
  return controller
}
