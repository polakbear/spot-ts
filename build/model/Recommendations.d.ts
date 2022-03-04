import { SimplifiedTrack } from './Track';
export declare class Recommendations {
    seeds: RecommendationsSeed[];
    tracks: SimplifiedTrack[];
}
export interface RecommendationsSeed {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: 'artist' | 'genre' | 'track';
}
