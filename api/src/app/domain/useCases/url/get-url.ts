import { Result } from '../../protocols/result'

export interface GetUrlDto {
  hash: string
}

export interface GetUrlUc {
  exec: (data: GetUrlDto) => Promise<Result<string>>
}
