import { Queue, Worker, QueueEvents } from 'bullmq'
import Redis from 'ioredis'
import { IQueueManager } from '../../data/protocols/utils/queue-manager'
import env from '../../../env'

export class QueueManager implements IQueueManager {
  private static instance: QueueManager
  public queue: Queue
  public redis: Redis
  public queueEvents: QueueEvents
  private static readonly queueName: string = 'defaultQueue'
  private static connectionDetails: {
    host: string
    port: number
    maxRetriesPerRequest: number|null
  }

  constructor() {}

  public static getInstance(): QueueManager {
    QueueManager.connectionDetails = {
      host: env.redis.HOST,
      port: env.redis.PORT,
      maxRetriesPerRequest: null
    }
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager()
      // noinspection JSAnnotator
      QueueManager.instance.redis = new Redis(QueueManager.connectionDetails)
      QueueManager.instance.queue = new Queue(QueueManager.queueName, { connection: QueueManager.instance.redis })
      QueueManager.instance.queueEvents = new QueueEvents(QueueManager.queueName)
    }
    return QueueManager.instance
  }

  public addJob(jobName: string, payload: any): void {
    this.queue.add(jobName, payload)
  }

  public addWorker(jobName: string, callback: any): void {
    // noinspection JSAnnotator
    new Worker(QueueManager.queueName, async job => {
      if (job.name === jobName) {
        callback(job)
      }
    }, { connection: QueueManager.instance.redis })
  }

  public onSuccess(callback: any): void {
    this.queueEvents.on('completed', async (jobId, returnvalue) => {
      callback({ jobId, returnvalue })
    })
  }

  public onError(callback: any): void {
    this.queueEvents.on('failed', async (jobId, err) => {
      callback({ jobId, err })
    })
  }
}
