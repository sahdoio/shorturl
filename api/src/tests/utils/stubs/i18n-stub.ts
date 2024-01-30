import { Internationalization } from '../../../app/data/protocols/utils/internationalization'

export class I18nStub implements Internationalization {
  t (key: string): string {
    return key
  }
}
