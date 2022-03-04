import { Track } from './Track';
import { SimplifiedArtist } from './Artist';
export declare class Recommendations {
    seeds: RecommendationsSeed[];
    tracks: Track<SimplifiedArtist>[];
}
export interface RecommendationsSeed {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: 'artist' | 'genre' | 'track';
}
