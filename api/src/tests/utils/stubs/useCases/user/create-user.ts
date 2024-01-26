import { UserEntity } from '../../../../../app/domain/entities/User'
import { Result } from '../../../../../app/domain/protocols/result'
import { CreateUserDto, CreateUserUc } from '../../../../../app/domain/useCases/user/create-user'
import { userEntityMock } from '../../../mocks/user/user-entity-mock'
import { I18nStub } from '../../i18n-stub'

export class CreateUserUcStub implements CreateUserUc {
  async exec(data: CreateUserDto): Promise<Result<UserEntity>> {
    return {
      code: 200,
      data: userEntityMock,
      msg: new I18nStub().t('CREATE_USER_SUCCESSFUL')
    }
  }
}
