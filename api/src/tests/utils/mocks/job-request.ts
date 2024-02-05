import { JobRequest } from '../../../app/presentation/protocols/job-request'

interface MakeJobRequestMockDto {
  jobId: number
  body?: any
}

export const makeJobRequestMock = (obj?: MakeJobRequestMockDto): JobRequest => ({
  jobId: obj.jobId,
  body: obj?.body,
})
