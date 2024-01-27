import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { GetUrlController } from '../../../../presentation/controllers/url/get-url'
import { DbFindLinkRepository } from '../../../../implementations/repositories/links/db-find-link-repository'
import { GetUrl } from '../../../../data/useCases/url/get-url'

export const makeGetUrlController = (): GetUrlController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const findLinkRepository = new DbFindLinkRepository(dbORM)
  const uc = new GetUrl(i18n, findLinkRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  return  new GetUrlController(validator, log, uc)
}
