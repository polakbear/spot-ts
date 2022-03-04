import { ExternalURL } from './ExternalURL';
import { Album } from './Album';
export declare class Track<T> {
    album: Album;
    artists: T[];
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
