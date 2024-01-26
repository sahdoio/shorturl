import { HttpRequest } from '../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'
import { Application } from '../../../app'
import { AuthorizationMiddleware } from '../../../app/presentation/middlewares/authorization'
import { AuthorizerUcStub } from '../../utils/stubs/useCases/auth/authorizer'
import { AuthorizerUc, LoggedUser } from '../../../app/domain/useCases/auth/authorizer'
import { serverOk } from '../../../app/presentation/helpers/http'
import { loggedUserMock } from '../../utils/mocks/auth/logged-user-mock'
import { Authorizer } from '../../../app/data/useCases/auth/authorizer'
import { Log } from '../../../app/implementations/helpers/log'
import { JsonWebToken } from '../../../app/implementations/encrypters/jwt'
import env from '../../../env'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import Config from '../../../config/config'
import { DbFindUserRepository } from '../../../app/implementations/repositories/user/db-find-user-repository'
import { CreateUserDto } from '../../../app/domain/useCases/user/create-user'
import { faker } from '@faker-js/faker'
import { DbCreateUserRepository } from '../../../app/implementations/repositories/user/db-create-user-repository'
import { Bcrypt } from '../../../app/implementations/encrypters/bcrypt'

interface SutTypes {
  sut: AuthorizationMiddleware
  data: HttpRequest
  uc: AuthorizerUc
  loggedUser: LoggedUser
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const log = new Log
  const jwt = new JsonWebToken(log)
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const bcrypt = new Bcrypt
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const findUserRepository = new DbFindUserRepository(dbORM)
  const createUserRepository = new DbCreateUserRepository(dbORM)
  const uc = new Authorizer(jwt, jwtConfig, findUserRepository, log)
  const sut = new AuthorizationMiddleware(uc)
  const userData: CreateUserDto = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.string.numeric('##########'),
    password: faker.word.noun(6),
  }
  const createdUser = await createUserRepository.exec({ ...userData, password: await bcrypt.encrypt(userData.password) })
  const jwtData = {
    id: createdUser.id,
    email: createdUser.email,
  }
  const token = await jwt.sign(jwtData, jwtConfig)
  const data = makeHttpRequestMock({
    headers: {
      authorization: token
    }
  })
  const loggedUser: LoggedUser = {
    id: createdUser.id,
    name: createdUser.firstName + ' ' + createdUser.lastName,
    email: createdUser.email
  }
  return {
    sut,
    data,
    uc,
    loggedUser
  }
}

describe('AuthorizationMiddleware', () => {
  test('Should return Ok if login was executed successfully', async () => {
    const { sut, data, loggedUser } = await makeSut()
    const res = await sut.handle(data)
    const expected = serverOk({ ...loggedUser })
    expect(res.statusCode).toBe(expected.statusCode)
    expect(res.body.data).toBe(expected.body.data)
  })
})
