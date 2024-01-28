export interface IQueueManager {
  addJob: (jobName: string, payload: any) => void
  addWorker: (name: string, callback: any) => void
  onSuccess: (callback: any) => void
  onError: (callback: any) => void
}
