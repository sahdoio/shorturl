import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbCreateLinkRepository } from '../../../../implementations/repositories/links/db-create-link-repository'
import { ShortenUrlController } from '../../../../presentation/controllers/url/shorten-url'
import { ShortenUrl } from '../../../../data/useCases/url/shorten-url'
import { UrlShortener } from '../../../../implementations/helpers/url-shortener'
import env from '../../../../../env'
import { QueueManager } from '../../../../implementations/helpers/queue-manager'

export const makeShortenUrlController = (): ShortenUrlController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const urlShortener = new UrlShortener(env.APP_HOST);
  const createLinkRepository = new DbCreateLinkRepository(dbORM)
  const uc = new ShortenUrl(i18n, urlShortener, QueueManager.getInstance(), createLinkRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  return new ShortenUrlController(validator, log, uc)
}
