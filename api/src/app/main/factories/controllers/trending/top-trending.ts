import { SequelizeORM } from '../../../../implementations/database/sequelize'
import { Log } from '../../../../implementations/helpers/log'
import { I18n } from '../../../../implementations/internationalization/i18n'
import { DbFindLinkRepository } from '../../../../implementations/repositories/links/db-find-link-repository'
import { TopTrendingController } from '../../../../presentation/controllers/trending/top-trending'
import { TopTrending } from '../../../../data/useCases/trendings/top-trending'

export const makeTopTrendingController = (): TopTrendingController => {
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance()
  const findLinkRepository = new DbFindLinkRepository(dbORM)
  const uc = new TopTrending(i18n, findLinkRepository)
  const log = new Log()
  return  new TopTrendingController(log, uc)
}
