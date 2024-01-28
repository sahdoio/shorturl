import { AxiosHttpRequest } from './axios-http-request'
import * as cheerio from 'cheerio'
import { IWebCrawler } from '../../data/protocols/utils/web-crawler'

export class WebCrawler implements IWebCrawler {
  private readonly axiosHttpRequest: AxiosHttpRequest

  constructor() {
    this.axiosHttpRequest = new AxiosHttpRequest()
  }

  public async findOne(url: string, searchString: string): Promise<string> {
    const html = await this.getHtml(url)
    return this.searchFirst(html, searchString)
  }

  public async findAll(url: string, searchString: string): Promise<string[]> {
    const html = await this.getHtml(url)
    return this.search(html, searchString)
  }

  private async getHtml(url: string): Promise<string> {
    const response = await this.axiosHttpRequest.exec({
      url,
      method: 'GET'
    })
    // @ts-ignore
    return response.data
  }

  private search(html: string, searchString: string): string[] {
    const $ = cheerio.load(html)
    const elements = $(searchString)
    let results: string[] = []

    elements.each((index, element) => {
      // Here you can choose what to return, e.g., outer HTML of the element
      results.push($.html(element))
    })

    return results
  }

  private searchFirst(html: string, searchString: string): string {
    const $ = cheerio.load(html)
    const element = $(searchString).first()

    // Return the text content of the element
    return element.text().trim()
  }
}
