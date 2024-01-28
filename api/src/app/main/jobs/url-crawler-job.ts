
export class DisableCashOutModeJob {
  private queue: any

  constructor () {
    this.build()
  }

  private build (): void {
    this.queue = new Bull("email", {
      redis: "shortutl-redis:6379",
    });
  }

  start (): void {
    this.job.start()
  }
}
