import { linkDetailsEntityMock } from '../../mocks/link-details-mock'
import { IWebCrawler } from '../../../../app/data/protocols/utils/web-crawler'

export class WebCrawlerStub implements IWebCrawler {
  public async findOne(url: string, searchString: string): Promise<string> {
    return linkDetailsEntityMock.value
  }

  public async findAll(url: string, searchString: string): Promise<string[]> {
    return [linkDetailsEntityMock.value, linkDetailsEntityMock.value]
  }
}
