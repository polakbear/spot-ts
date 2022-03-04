import { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Artist } from './model/Artist';
import { Album } from './model/Album';
import { AudioFeatures } from './model/AudioFeatures';
import { Recommendations } from './model/Recommendations';
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
    getRecommendations(query: AudioFeatures): Promise<Recommendations>;
    request(endpoint: string, params?: AxiosRequestConfig['params'], headers?: Record<string, any>, method?: Method): Promise<any>;
    private key;
    private createHeaders;
    handleResponse: (response: AxiosResponse) => any;
    private addFormattedSeeds;
}
