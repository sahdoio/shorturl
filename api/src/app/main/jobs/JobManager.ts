export class JobManager {
  public run (): boolean {
    if (process.env.CRON_ENABLED !== 'true') {
      return false
    }

    return true
  }
}
