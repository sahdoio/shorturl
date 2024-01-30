import { IQueueManager } from '../../../../app/data/protocols/utils/queue-manager'

export class QueueManagerStub implements IQueueManager {

  public addJob(jobName: string, payload: any): void {
    return
  }

  public addWorker(jobName: string, callback: any): void {
    return
  }

  public onSuccess(callback: any): void {
    return
  }

  public onError(callback: any): void {
    return
  }
}
