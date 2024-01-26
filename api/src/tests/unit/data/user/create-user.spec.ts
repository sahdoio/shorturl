import { Application } from '../../../../app'
import { ok, unprocessableEntity } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateUser } from '../../../../app/data/useCases/user/create-user'
import { CreateUserDto, CreateUserUc } from '../../../../app/domain/useCases/user/create-user'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { BcryptStub } from '../../../utils/stubs/bcrypt-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { CreateUserRepositoryStub } from '../../../utils/stubs/repositories/user/create-user-repository-stub'
import { FindUserRepositoryStub } from '../../../utils/stubs/repositories/user/find-user-repository-stub'

interface SutTypes {
  sut: CreateUserUc
  i18nStub: Internationalization
  createUserRepositoryStub: CreateUserRepositoryStub
  createUserRepositoryDto: CreateUserDto,
  findUserRepositoryStub: FindUserRepositoryStub
}

const makeSut = (): SutTypes => {
  new Application(true)
  const createUserRepositoryDto = {
    email: "create_user_unit_test@test.com",
    firstName: "User",
    lastName: "Unit Test",
    phoneNumber: "9999999999",
    password: "123456"
  }
  const i18nStub = new I18nStub()
  const bcryptStub = new BcryptStub()
  const findUserRepositoryStub = new FindUserRepositoryStub()
  const createUserRepositoryStub = new CreateUserRepositoryStub()
  const sut = new CreateUser(
    i18nStub,
    bcryptStub,
    createUserRepositoryStub,
    findUserRepositoryStub
  )
  return {
    sut,
    i18nStub,
    createUserRepositoryStub,
    createUserRepositoryDto,
    findUserRepositoryStub
  }
}

describe('CreateUser', () => {
  test('Should return 200 if the user creation was executed successfully', async () => {
    const { sut, i18nStub, createUserRepositoryDto, findUserRepositoryStub } = makeSut()
    jest.spyOn(findUserRepositoryStub, 'findOne').mockImplementation(() => null)
    const res = await sut.exec(createUserRepositoryDto)
    expect(res).toEqual(ok(i18nStub.t('CREATE_USER_SUCCESSFUL'), userEntityMock))
  })

  test('Should return 422 if the user already exists with the given email', async () => {
    const { sut, i18nStub, createUserRepositoryDto } = makeSut()
    const res = await sut.exec( { ...createUserRepositoryDto, email: userEntityMock.email })
    expect(res).toEqual(unprocessableEntity(i18nStub.t('ERROR_EXISTING_USER')))
  })

  test('Should return 422 if the user already exists with the given phoneNumber', async () => {
    const { sut, i18nStub, createUserRepositoryDto, findUserRepositoryStub } = makeSut()
    jest.spyOn(findUserRepositoryStub, 'findOne').mockImplementationOnce(() => null)
    const res = await sut.exec( { ...createUserRepositoryDto, phoneNumber: userEntityMock.phoneNumber })
    expect(res).toEqual(unprocessableEntity(i18nStub.t('ERROR_EXISTING_USER')))
  })
})
