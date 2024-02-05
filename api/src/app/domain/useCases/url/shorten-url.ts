import { Result } from '../../protocols/result'

export interface ShortenUrlDto {
  url: string
}

export interface ShortenUrlUc {
  exec: (data: ShortenUrlDto) => Promise<Result<string>>
}
