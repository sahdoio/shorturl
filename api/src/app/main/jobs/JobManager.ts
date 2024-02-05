import { UrlCrawlerJob } from './url-crawler-job'
import { IJobManager } from '../protocols/JobManager'

export class JobManager implements IJobManager {
  public run (): boolean {
    if (process.env.CRON_ENABLED !== 'true') {
      return false
    }

    (new UrlCrawlerJob()).start()

    return true
  }
}
