import { Result } from '../../protocols/result'
import { LinkEntity } from '../../entities/Link'

export interface CrawlUrlDto {
  name: string
  description?: string
  statusId: number
}

export interface CrawlUrlUc {
  exec: (data: CrawlUrlDto) => Promise<Result<LinkEntity>>
}
