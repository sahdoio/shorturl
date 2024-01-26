import { CreateUser } from '../../../../data/useCases/user/create-user'
import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Bcrypt } from '../../../../implementations/encrypters/bcrypt'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbCreateUserRepository } from '../../../../implementations/repositories/user/db-create-user-repository'
import { DbFindUserRepository } from '../../../../implementations/repositories/user/db-find-user-repository'
import { CreateUserController } from '../../../../presentation/controllers/user/create-user'


export const makeCreateUserController = (): CreateUserController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const createUserRepository = new DbCreateUserRepository(dbORM)
  const findUserRepository = new DbFindUserRepository(dbORM)
  const bcrypt = new Bcrypt()
  const uc = new CreateUser(i18n, bcrypt, createUserRepository, findUserRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  const controller = new CreateUserController(validator, log, uc)
  return controller
}
