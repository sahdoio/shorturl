import { Result } from '../../protocols/result'
import { LinkEntity } from '../../entities/Link'

export interface CrawlUrlDto {
  url: string
  urlHash: string
}

export interface CrawlUrlUc {
  exec: (data: CrawlUrlDto) => Promise<Result<LinkEntity>>
}
