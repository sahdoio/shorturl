import { JobRequest } from './job-request'

export interface JobController {
  handle: (request: JobRequest) => Promise<void>
}
