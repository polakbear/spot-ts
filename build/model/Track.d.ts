import { ExternalURL } from './ExternalURL';
import { Artist, SimplifiedArtist } from './Artist';
import { Album } from './Album';
export declare class Track implements SimplifiedTrack {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    duration_ms: number;
    external_urls: ExternalURL[];
    href: string;
    id: string;
    name: string;
    popularity: boolean;
    uri: string;
    constructor(response: any);
}
export interface SimplifiedTrack {
    artists: SimplifiedArtist[];
    available_markets: string[];
    duration_ms: number;
    external_urls: ExternalURL[];
    href: string;
    id: string;
    name: string;
    uri: string;
}
