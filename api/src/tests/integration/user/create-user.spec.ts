import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { CreateUserUc } from '../../../app/domain/useCases/user/create-user'
import { CreateUserController } from '../../../app/presentation/controllers/user/create-user'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'
import { Application } from '../../../app'
import { missingFields } from '../../../app/presentation/helpers/response-builder'
import { LogStub } from '../../utils/stubs/log-stub'
import { CreateUser } from '../../../app/data/useCases/user/create-user'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { DbCreateLinkDetailsRepository } from '../../../app/implementations/repositories/linkDetails/db-create-link-details-repository'
import { DbFindLinkDetailsRepository } from '../../../app/implementations/repositories/linkDetails/db-find-link-details-repository'
import { Bcrypt } from '../../../app/implementations/encrypters/bcrypt'
import { faker } from '@faker-js/faker'
import { CreateUserDto } from '../../../app/domain/useCases/user/create-user'
import Config from '../../../config/config'

interface SutTypes {
  sut: CreateUserController
  data: HttpRequest
  uc: CreateUserUc
  i18n: Internationalization
  personalValidator: FieldValidator
  userData: CreateUserDto
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const createUserRepository = new DbCreateLinkDetailsRepository(dbORM)
  const findUserRepository = new DbFindLinkDetailsRepository(dbORM)
  const bcrypt = new Bcrypt()
  const uc = new CreateUser(i18n, bcrypt, createUserRepository, findUserRepository)
  const personalValidator = new PersonalFieldValidator()
  const logStub = new LogStub
  const sut = new CreateUserController(personalValidator, logStub, uc)
  const userData: CreateUserDto = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.string.numeric('##########'),
    password: faker.word.noun(6),
  }
  const data = makeHttpRequestMock({
    body: { ...userData }
  })
  return {
    sut,
    data,
    i18n,
    uc,
    personalValidator,
    userData
  }
}

describe('CreateUserController Integration', () => {
  test('Should return Ok if user was created successfully', async () => {
    const { sut, data, i18n, userData } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('CREATE_USER_SUCCESSFUL'))
    expect(res.body?.data?.email).toBe(userData.email)
  })

  test('Should return 422 if user creation was executed with missing parameters', async () => {
    const { sut } = await makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['email', 'firstName', 'lastName', 'phoneNumber', 'password']
    const errorResponse = missingFields(missingFieldsList)
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(422)
    expect(res.body.msg).toBe(errorResponse.msg)
  })

  test('Should return 500 if user creation was executed with server error', async () => {
    const { sut, uc, data } = await makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
