export interface UrlShortenerResponse {
  url: string
  urlHash: string
}
export interface IUrlShortener {
  exec: (url: string) => UrlShortenerResponse
}
