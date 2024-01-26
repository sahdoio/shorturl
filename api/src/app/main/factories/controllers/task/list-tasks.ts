import { ListTasks } from '../../../../data/useCases/task/list-tasks'
import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbFindTaskRepository } from '../../../../implementations/repositories/task/db-find-task-repository'
import { ListTasksController } from '../../../../presentation/controllers/task/list-tasks'

export const makeListTasksController = (): ListTasksController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const findTaskRepository = new DbFindTaskRepository(dbORM)
  const uc = new ListTasks(i18n, findTaskRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  const controller = new ListTasksController(validator, log, uc)
  return controller
}
