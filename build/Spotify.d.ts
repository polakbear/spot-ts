import { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Artist, Album, Recommendations, RecommendationsOptions, AudioFeatures } from './model';
export default class Spotify {
    api: string;
    token: string;
    client: AxiosInstance;
    constructor(token: string, api?: string);
    setToken(token: string): void;
    getToken(): string;
    getAPI(): string;
    getArtist(id: string): Promise<Artist>;
    getArtists(ids: string[]): Promise<Artist[]>;
    getAlbum(id: string): Promise<Album>;
    getAlbums(ids: string[]): Promise<Album[]>;
    getGenres(): Promise<string[]>;
    getRecommendations(query: RecommendationsOptions): Promise<Recommendations>;
    getAudioFeatures(id: string): Promise<AudioFeatures>;
    request(endpoint: string, params?: AxiosRequestConfig['params'], headers?: Record<string, any>, method?: Method): Promise<any>;
    private key;
    private createHeaders;
    handleResponse: (response: AxiosResponse) => any;
    private addFormattedSeeds;
}
