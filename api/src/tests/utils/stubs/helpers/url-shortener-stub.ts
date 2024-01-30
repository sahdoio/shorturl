import { IUrlShortener, UrlShortenerResponse } from '../../../../app/data/protocols/utils/url-shotener'
export class UrlShortenerStub implements IUrlShortener {
  constructor(
    private readonly baseUrl: string
  ) {}

  public exec(url: string): UrlShortenerResponse {
    const hash = this.hash(url);
    return {
      url: this.buildUrlFromHash(hash),
      urlHash: hash
    }
  }

  public buildUrlFromHash(hash: string): string {
    return `${ this.baseUrl }/${ hash }`
  }

  private hash(url: string): string {
    return 'abc123';
  }
}
