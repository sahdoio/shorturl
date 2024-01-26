import { Application } from '../../../../app'
import { ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { ListTasks } from '../../../../app/data/useCases/task/list-tasks'
import { FindTaskDto, ListTasksUc } from '../../../../app/domain/useCases/task/list-tasks'
import Config from '../../../../config/config'
import { repositoryMetadataMock } from '../../../utils/mocks/repository-metadata-mock'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { FindTaskRepositoryStub } from '../../../utils/stubs/repositories/task/find-task-repository-stub'

interface SutTypes {
  sut: ListTasksUc
  i18nStub: Internationalization
  findTaskRepositoryStub: FindTaskRepositoryStub
  findTaskRepositoryDto: FindTaskDto
}

const makeSut = (): SutTypes => {
  new Application(true)
  const findTaskRepositoryDto: FindTaskDto = {
    name: "unit test task",
    description: "This is a unit test task",
    statusId: Config.TASK_STATUS.TO_DO
  }
  const i18nStub = new I18nStub()
  const findTaskRepositoryStub = new FindTaskRepositoryStub()
  const sut = new ListTasks(
    i18nStub,
    findTaskRepositoryStub
  )
  return {
    sut,
    i18nStub,
    findTaskRepositoryStub,
    findTaskRepositoryDto
  }
}

describe('FindTask', () => {
  test('Should return 200 if the task listing was executed successfully', async () => {
    const { sut, i18nStub, findTaskRepositoryDto } = makeSut()
    const expectedData = {
      payload: [taskEntityMock],
      metadata: repositoryMetadataMock
    }
    const res = await sut.exec(findTaskRepositoryDto)
    expect(res).toEqual(ok(i18nStub.t('FIND_TASK_SUCCESSFUL'), expectedData))
  })
})
