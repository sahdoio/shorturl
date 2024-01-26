import { CreateTask } from '../../../../data/useCases/task/create-task'
import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbCreateTaskRepository } from '../../../../implementations/repositories/task/db-create-task-repository'
import { CreateTaskController } from '../../../../presentation/controllers/task/create-task'

export const makeCreateTaskController = (): CreateTaskController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const createTaskRepository = new DbCreateTaskRepository(dbORM)
  const uc = new CreateTask(i18n, createTaskRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  const controller = new CreateTaskController(validator, log, uc)
  return controller
}
