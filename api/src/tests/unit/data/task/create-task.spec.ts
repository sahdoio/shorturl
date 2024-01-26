import { Application } from '../../../../app'
import { ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateTask } from '../../../../app/data/useCases/task/create-task'
import { CreateTaskDto, CreateTaskUc } from '../../../../app/domain/useCases/task/create-task'
import Config from '../../../../config/config'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { CreateTaskRepositoryStub } from '../../../utils/stubs/repositories/task/create-task-repository-stub'

interface SutTypes {
  sut: CreateTaskUc
  i18nStub: Internationalization
  createTaskRepositoryStub: CreateTaskRepositoryStub
  createTaskRepositoryDto: CreateTaskDto
}

const makeSut = (): SutTypes => {
  new Application(true)
  const createTaskRepositoryDto: CreateTaskDto = {
    name: "unit test task",
    description: "This is a unit test task",
    statusId: Config.TASK_STATUS.TO_DO
  }
  const i18nStub = new I18nStub()
  const createTaskRepositoryStub = new CreateTaskRepositoryStub()
  const sut = new CreateTask(
    i18nStub,
    createTaskRepositoryStub
  )
  return {
    sut,
    i18nStub,
    createTaskRepositoryStub,
    createTaskRepositoryDto
  }
}

describe('CreateTask', () => {
  test('Should return 200 if the task creation was executed successfully', async () => {
    const { sut, i18nStub, createTaskRepositoryDto } = makeSut()
    const res = await sut.exec(createTaskRepositoryDto)
    expect(res).toEqual(ok(i18nStub.t('CREATE_TASK_SUCCESSFUL'), taskEntityMock))
  })
})
