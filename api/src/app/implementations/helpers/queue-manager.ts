import { Queue, Worker, QueueEvents } from 'bullmq'
import { IQueueManager } from '../../data/protocols/utils/queue-manager'

export class QueueManager implements IQueueManager {
  private static instance: QueueManager
  public queue: Queue
  public queueEvents: QueueEvents
  private static readonly queueName: string = 'defaultQueue'
  private static readonly connectionDetails: {
    host: string
    port: number
  } = {
    host: '127.0.0.1',
    port: 6379,
  }

  constructor() {
  }

  public static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager()
      // noinspection JSAnnotator
      QueueManager.instance.queue = new Queue(QueueManager.queueName, { connection: QueueManager.connectionDetails })
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
    }, { connection: QueueManager.connectionDetails })
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
