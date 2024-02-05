import { QueueManager } from '../../implementations/helpers/queue-manager'
import { IQueueManager } from '../../data/protocols/utils/queue-manager'
import { makeCrawlUrlController } from '../factories/controllers/url/crawl-url'
import { JobRequest } from '../../presentation/protocols/job-request'
import { Job } from '../protocols/Job'

export class UrlCrawlerJob implements Job {
  private queueManager: IQueueManager

  constructor() {
    this.build()
  }

  private build(): void {
    this.queueManager = QueueManager.getInstance()
  }

  public start(): void {
    this.queueManager.addWorker('url-crawler', async (job: any) => {
      console.log('Job UrlCrawlerJob is running', new Date().toUTCString())
      const controller = makeCrawlUrlController()
      const httpRequest: JobRequest = {
        jobId: job.id,
        body: {
          url: job.data.url,
          urlHash: job.data.urlHash
        }
      }
      await controller.handle(httpRequest)
    })
    this.queueManager.onSuccess((res: any) => {
      console.log('Job UrlCrawlerJob - success: ', res)
      console.log('Job UrlCrawlerJob is done', new Date().toUTCString())
    })
    this.queueManager.onError((err: any) => {
      console.log('Job UrlCrawlerJob - error: ', err)
      console.log('Job UrlCrawlerJob failed', new Date().toUTCString())
    })
  }
}
