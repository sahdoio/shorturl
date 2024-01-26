import { Internationalization } from '../../data/protocols/utils/internationalization'
import i18n from 'i18n'

export class I18n implements Internationalization {
  t (key: string): string {
    return i18n.__(key)
  }
}
