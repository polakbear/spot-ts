import { SimplifiedArtist } from './Artist'
import { ExternalURL } from './ExternalURL'
import { Image } from './Image'

export interface SimplifiedAlbum {
  artists: SimplifiedArtist[]
  external_urls: ExternalURL[]
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  restrictions: any
  uri: string
}

export class Album implements SimplifiedAlbum {
  public artists: SimplifiedArtist[]
  public external_urls: ExternalURL[]
  public genres: any[]
  public href: string
  public id: string
  public images: Image[]
  public name: string
  public release_date: string
  public restrictions: any
  public popularity: number
  public uri: string

  constructor(response: any) {
    this.artists = response.artists
    this.external_urls = response.external_urls
    this.genres = response.genres
    this.href = response.href
    this.id = response.id
    this.images = response.images
    this.name = response.name
    this.popularity = response.popularity
    this.release_date = response.release_date
    this.uri = response.uri
  }
}
