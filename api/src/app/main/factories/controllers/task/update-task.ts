import { UpdateTask } from '../../../../data/useCases/task/update-task'
import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbFindTaskRepository } from '../../../../implementations/repositories/task/db-find-task-repository'
import { DbUpdateTaskRepository } from '../../../../implementations/repositories/task/db-update-task-repository'
import { UpdateTaskController } from '../../../../presentation/controllers/task/update-task'

export const makeUpdateTaskController = (): UpdateTaskController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const findTaskRepository = new DbFindTaskRepository(dbORM)
  const updateTaskRepository = new DbUpdateTaskRepository(dbORM)
  const uc = new UpdateTask(i18n, findTaskRepository, updateTaskRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  const controller = new UpdateTaskController(validator, log, uc)
  return controller
}
