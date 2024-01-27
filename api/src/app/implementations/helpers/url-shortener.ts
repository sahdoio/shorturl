import { createHash } from 'crypto';
import { IUrlShortener, UrlShortenerResponse } from '../../data/protocols/utils/url-shotener'

export class UrlShortener implements IUrlShortener {
  constructor(
    private readonly baseUrl: string
  ) {
  }

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
    const uniqueSuffix = `${ new Date().toISOString() }-${ Math.random().toString(36).substring(2) }`;
    const modifiedUrl = `${ url }-${ uniqueSuffix }`;
    return this.toBase62(createHash('sha256').update(modifiedUrl).digest(), 6);
  }

  private toBase62(buffer: Buffer, length: number): string {
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = BigInt('0x' + buffer.toString('hex'));
    let output = '';

    while (number > 0 && output.length < length) {
      output = alphabet[Number(number % BigInt(62))] + output;
      number /= BigInt(62);
    }

    return output.slice(0, length);
  }
}
