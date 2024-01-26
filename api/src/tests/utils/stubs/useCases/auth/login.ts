import { Result } from '../../../../../app/domain/protocols/result'
import { UcOptions } from '../../../../../app/domain/protocols/uc-options'
import { LoginResponseDto, LoginUc } from '../../../../../app/domain/useCases/auth/login'
import { loginResponseMock } from '../../../mocks/auth/login-response--mock'
import { I18nStub } from '../../i18n-stub'

export class LoginUcStub implements LoginUc {
  async exec(email: string, password: string, ucOptions?: UcOptions): Promise<Result<LoginResponseDto>> {
    return {
      code: 200,
      data: loginResponseMock,
      msg: new I18nStub().t('LOGIN_SUCCESSFUL')
    }
  }
}
