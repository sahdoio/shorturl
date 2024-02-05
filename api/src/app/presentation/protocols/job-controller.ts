import { JobRequest } from './job-request'
import { JobResponse } from './job-response'

export interface JobController {
  handle: (request: JobRequest) => Promise<JobResponse>
}
