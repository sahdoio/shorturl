import { Application } from '../../../../app'
import { notFound, ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { UpdateTask } from '../../../../app/data/useCases/task/update-task'
import { UpdateTaskUc } from '../../../../app/domain/useCases/task/update-task'
import Config from '../../../../config/config'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { FindTaskRepositoryStub } from '../../../utils/stubs/repositories/task/find-task-repository-stub'
import { UpdateTaskRepositoryStub } from '../../../utils/stubs/repositories/task/update-task-repository-stub'

interface SutTypes {
  sut: UpdateTaskUc
  i18nStub: Internationalization
  findTaskRepositoryStub: FindTaskRepositoryStub
  updateTaskRepositoryStub: UpdateTaskRepositoryStub
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const findTaskRepositoryStub = new FindTaskRepositoryStub()
  const updateTaskRepositoryStub = new UpdateTaskRepositoryStub()
  const sut = new UpdateTask(
    i18nStub,
    findTaskRepositoryStub,
    updateTaskRepositoryStub,
  )
  return {
    sut,
    i18nStub,
    findTaskRepositoryStub,
    updateTaskRepositoryStub
  }
}

describe('UpdateTask', () => {
  test('Should return 200 if the task update was executed successfully', async () => {
    const { sut, i18nStub } = makeSut()
    const res = await sut.exec(taskEntityMock.id, { statusId: Config.TASK_STATUS.IN_PROGRESS })
    expect(res).toEqual(ok(i18nStub.t('UPDATE_TASK_SUCCESSFUL')))
  })

  test('Should return 400 if the task to be updated was not found', async () => {
    const { sut, i18nStub, findTaskRepositoryStub } = makeSut()
    await jest.spyOn(findTaskRepositoryStub, 'findOne').mockImplementationOnce(async () => null)
    const res = await sut.exec(taskEntityMock.id, { statusId: Config.TASK_STATUS.IN_PROGRESS })
    expect(res).toEqual(notFound(i18nStub.t('NOT_FOUND')))
  })
})
