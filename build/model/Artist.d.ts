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
export declare class Artist implements SimplifiedArtist {
    external_urls: ExternalURL[];
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
    constructor(response: any);
}
