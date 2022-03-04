import { ExternalURL } from './ExternalURL';
import { Image } from './Image';

export interface SimplifiedArtist {
  external_urls: ExternalURL[];
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export class Artist implements SimplifiedArtist {
  public external_urls: ExternalURL[];
  public genres: string[];
  public href: string;
  public id: string;
  public images: Image[];
  public name: string;
  public popularity: number;
  public type: string;
  public uri: string;

  constructor(response: any) {
    this.external_urls = response.external_urls;
    this.genres = response.genres;
    this.href = response.href;
    this.id = response.id;
    this.images = response.images;
    this.name = response.name;
    this.popularity = response.popularity;
    this.type = response.type;
    this.uri = response.type;
  }
}
