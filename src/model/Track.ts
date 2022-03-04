import { ExternalURL } from './ExternalURL'
import { Album } from './Album'

export class Track<T> {
  public album: Album
  public artists: T[]
  public available_markets: string[]
  public duration_ms: number
  public external_urls: ExternalURL[]
  public href: string
  public id: string
  public name: string
  public popularity: boolean
  public uri: string

  constructor(response: any) {
    this.album = response.album
    this.artists = response.artists
    this.available_markets = response.available_markets
    this.duration_ms = response.duration_ms
    this.external_urls = response.external_urls
    this.href = response.href
    this.id = response.id
    this.name = response.name
    this.popularity = response.popularity
    this.uri = response.uri
  }
}
