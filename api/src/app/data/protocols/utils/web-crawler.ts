export interface IWebCrawler {
    findOne(url: string, searchString: string): Promise<string>;
    findAll(url: string, searchString: string): Promise<string[]>;
}
