import { UrlCrawlerJob } from './url-crawler-job'

export class JobManager {
  public run (): boolean {
    if (process.env.CRON_ENABLED !== 'true') {
      return false
    }

    (new UrlCrawlerJob()).start()

    return true
  }
}
