import { SimplifiedArtist } from './Artist';
import { ExternalURL } from './ExternalURL';
import { Image } from './Image';
export interface SimplifiedAlbum {
    artists: SimplifiedArtist[];
    external_urls: ExternalURL[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    restrictions: any;
    uri: string;
}
export declare class Album implements SimplifiedAlbum {
    artists: SimplifiedArtist[];
    external_urls: ExternalURL[];
    genres: any[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    restrictions: any;
    popularity: number;
    uri: string;
    constructor(response: any);
}
