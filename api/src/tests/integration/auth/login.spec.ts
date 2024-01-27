import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { Login } from '../../../app/data/useCases/auth/login'
import { LoginUc } from '../../../app/domain/useCases/auth/login'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Bcrypt } from '../../../app/implementations/encrypters/bcrypt'
import { JsonWebToken } from '../../../app/implementations/encrypters/jwt'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { DbCreateLinkDetailsRepository } from '../../../app/implementations/repositories/linkDetails/db-create-link-details-repository'
import { DbFindLinkDetailsRepository } from '../../../app/implementations/repositories/linkDetails/db-find-link-details-repository'
import { LoginController } from '../../../app/presentation/controllers/auth/login'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import Config from '../../../config/config'
import env from '../../../env'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'
import { faker } from '@faker-js/faker'
import { CreateUserDto } from '../../../app/domain/useCases/user/create-user'
import { Application } from '../../../app'
import { Log } from '../../../app/implementations/helpers/log'

interface SutTypes {
  sut: LoginController
  data: HttpRequest
  uc: LoginUc
  i18n: Internationalization
  validator: FieldValidator
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const findUserRepository = new DbFindLinkDetailsRepository(dbORM)
  const createUserRepository = new DbCreateLinkDetailsRepository(dbORM)
  const bcrypt = new Bcrypt()
  const log = new Log;
  const jsonWebToken = new JsonWebToken(log)
  const i18n = new I18n()
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const uc = new Login(
    i18n,
    bcrypt,
    jsonWebToken,
    jwtConfig,
    findUserRepository
  )
  const validator = new PersonalFieldValidator()
  const sut = new LoginController(validator, log, uc)
  const userData: CreateUserDto = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.string.numeric('##########'),
    password: faker.word.noun(6),
  }
  const data = makeHttpRequestMock({
    body: {
      email: userData.email,
      password: userData.password
    }
  })
  await createUserRepository.exec({ ...userData, password: await bcrypt.encrypt(userData.password) })
  return {
    sut,
    data,
    uc,
    i18n,
    validator
  }
}

describe('Login Controller Integration', () => {
  test('Should return Ok if login was executed successfully', async () => {
    const { sut, data, i18n } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('LOGIN_SUCCESSFUL'))
  })
})
