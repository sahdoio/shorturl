import { Application } from '../../../app'
import { Authorizer } from '../../../app/data/useCases/auth/authorizer'
import { AuthorizerUc, LoggedUser } from '../../../app/domain/useCases/auth/authorizer'
import env from '../../../env'
import { JsonWebToken } from '../../../app/implementations/encrypters/jwt'
import { Log } from '../../../app/implementations/helpers/log'
import { DbFindUserRepository } from '../../../app/implementations/repositories/user/db-find-user-repository'
import { userEntityMock } from '../../utils/mocks/user/user-entity-mock'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import Config from '../../../config/config'
import { FindUserRepository } from '../../../app/data/protocols/repositories/user/find-user-repository'
import { JWT } from '../../../app/data/protocols/auth/jwt'
import { faker } from '@faker-js/faker'
import { CreateUserDto } from '../../../app/domain/useCases/user/create-user'
import { Bcrypt } from '../../../app/implementations/encrypters/bcrypt'
import { DbCreateUserRepository } from '../../../app/implementations/repositories/user/db-create-user-repository'

interface LoginCredentials {
  email: string,
  password: string
}

interface SutTypes {
  sut: AuthorizerUc
  findUserRepository: FindUserRepository,
  jwt: JWT,
  loginCredentials: LoginCredentials,
  token: string
  loggedUser: LoggedUser
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const log = new Log()
  const jwt = new JsonWebToken(log)
  const bcrypt = new Bcrypt()
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const findUserRepository = new DbFindUserRepository(dbORM)
  const createUserRepository = new DbCreateUserRepository(dbORM)
  const loginCredentials: LoginCredentials = {
    email: userEntityMock.email,
    password: userEntityMock.password
  }
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
  const loggedUser: LoggedUser = {
    id: createdUser.id,
    name: createdUser.firstName + ' ' + createdUser.lastName,
    email: createdUser.email
  }
  const sut = new Authorizer(
    jwt,
    jwtConfig,
    findUserRepository,
    log
  )
  return {
    sut,
    findUserRepository,
    jwt,
    loginCredentials,
    token,
    loggedUser
  }
}

describe('Authorizer Integration', () => {
  test('Should return logged user if operation is authorized', async () => {
    const { sut, token, loggedUser } = await makeSut()
    const res = await sut.isAuthorized(token)
    expect(res).toEqual(loggedUser)
  })

  test('Should return false if operation is unauthorized', async () => {
    const { sut, token } = await makeSut()
    const res = await sut.isAuthorized('invalid token')
    expect(res).toEqual(false)
  })

  test('Should return false if some error occurs', async () => {
    const { sut, token, jwt } = await makeSut()
    await jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.isAuthorized(token)
    expect(res).toEqual(false)
  })
})
