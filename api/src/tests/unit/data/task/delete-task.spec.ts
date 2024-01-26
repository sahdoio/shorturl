import { Application } from '../../../../app'
import { notFound, ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { DeleteTask } from '../../../../app/data/useCases/task/delete-task'
import { DeleteTaskUc } from '../../../../app/domain/useCases/task/delete-task'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { DeleteTaskRepositoryStub } from '../../../utils/stubs/repositories/task/delete-task-repository-stub'
import { FindTaskRepositoryStub } from '../../../utils/stubs/repositories/task/find-task-repository-stub'

interface SutTypes {
  sut: DeleteTaskUc
  i18nStub: Internationalization
  findTaskRepositoryStub: FindTaskRepositoryStub
  deleteTaskRepositoryStub: DeleteTaskRepositoryStub
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const findTaskRepositoryStub = new FindTaskRepositoryStub()
  const deleteTaskRepositoryStub = new DeleteTaskRepositoryStub()
  const sut = new DeleteTask(
    i18nStub,
    findTaskRepositoryStub,
    deleteTaskRepositoryStub,
  )
  return {
    sut,
    i18nStub,
    findTaskRepositoryStub,
    deleteTaskRepositoryStub
  }
}

describe('DeleteTask', () => {
  test('Should return 200 if the task deletion was executed successfully', async () => {
    const { sut, i18nStub } = makeSut()
    const res = await sut.exec({ id: taskEntityMock.id })
    expect(res).toEqual(ok(i18nStub.t('DELETE_TASK_SUCCESSFUL')))
  })

  test('Should return 400 if the task to be deleted was not found', async () => {
    const { sut, i18nStub, findTaskRepositoryStub } = makeSut()
    await jest.spyOn(findTaskRepositoryStub, 'findOne').mockImplementationOnce(async () => null)
    const res = await sut.exec({ id: 0 })
    expect(res).toEqual(notFound(i18nStub.t('NOT_FOUND')))
  })
})
