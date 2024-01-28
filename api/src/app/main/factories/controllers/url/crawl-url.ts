import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { PersonalFieldValidator } from '../../../../implementations/helpers/validate-fields'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbFindLinkRepository } from '../../../../implementations/repositories/links/db-find-link-repository'
import { CrawlUrlController } from '../../../../presentation/controllers/url/crawl-url'
import { CrawlUrl } from '../../../../data/useCases/url/crawl-url'
import { WebCrawler } from '../../../../implementations/helpers/web-crawler'
import { DbCreateLinkDetailsRepository } from '../../../../implementations/repositories/linkDetails/db-create-link-details-repository'

export const makeCrawlUrlController = (): CrawlUrlController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const webcrawler = new WebCrawler()
  const findLinkRepository = new DbFindLinkRepository(dbORM)
  const createLinkDetailsRepository = new DbCreateLinkDetailsRepository(dbORM)
  const uc = new CrawlUrl(i18n, webcrawler, findLinkRepository, createLinkDetailsRepository)
  const validator = new PersonalFieldValidator()
  const log = new Log
  return new CrawlUrlController(validator, log, uc)
}
