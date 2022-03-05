import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import {
  Artist,
  Album,
  Recommendations,
  RecommendationsOptions,
  AudioFeatures,
} from './model';

const DEFAULT_API = 'https://api.spotify.com/v1';

export default class Spotify {
  public api: string;
  public token: string;
  public client: AxiosInstance;

  constructor(token: string, api: string = DEFAULT_API) {
    this.api = api;
    this.token = token;
    this.client = axios.create({
      validateStatus: status => status < 500,
    });
  }

  public setToken(token: string): void {
    if (token.trim() === '') {
      throw new Error('Invalid token');
    }
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  public getAPI(): string {
    return this.api;
  }

  public async getArtist(id: string): Promise<Artist> {
    const response: AxiosResponse = await this.request(`artists/${id}`);
    return new Artist(this.handleResponse(response));
  }

  public async getArtists(ids: string[]): Promise<Artist[]> {
    const response: AxiosResponse = await this.request('artists', {
      ids: `${ids}`,
    });
    return this.handleResponse(response).artists.map(
      (artist: any) => new Artist(artist),
    );
  }

  public async getAlbum(id: string): Promise<Album> {
    const response: AxiosResponse = await this.request(`albums/${id}`);
    return new Album(this.handleResponse(response));
  }

  public async getAlbums(ids: string[]): Promise<Album[]> {
    const response: AxiosResponse = await this.request('albums', {
      ids: `${ids}`,
    });

    return this.handleResponse(response).albums.map(
      (album: any) => new Album(album),
    );
  }

  public async getGenres(): Promise<string[]> {
    const response: AxiosResponse = await this.request(
      'recommendations/available-genre-seeds',
    );
    return this.handleResponse(response).genres;
  }

  public async getRecommendations(
    query: RecommendationsOptions,
  ): Promise<Recommendations> {
    const response: AxiosResponse = await this.request(
      'recommendations',
      query,
    );
    return this.handleResponse(response);
  }

  public async getAudioFeatures(id: string): Promise<AudioFeatures> {
    const response: AxiosResponse = await this.request(`audio-features/${id}`);
    return new AudioFeatures(this.handleResponse(response));
  }

  public request(
    endpoint: string,
    params?: AxiosRequestConfig['params'],
    headers?: Record<string, any>,
    method: Method = 'GET',
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let request = {
          headers: { ...this.createHeaders(), ...headers },
          method,
          url: `${this.getAPI()}/${endpoint}`,
        };

        if (params) {
          request = { ...request, [this.key(method)]: params };
        }

        this.client(request).then(resolve, e => {
          reject(e);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  private key = (method: Method) =>
    ['PUT', 'POST', 'PATCH', 'DELETE'].includes(method) ? 'data' : 'params';

  private createHeaders(): Record<string, any> {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  public handleResponse = (response: AxiosResponse) => {
    if (response.status <= 204 && response.status >= 200) {
      return response.data;
    }
    throw new Error(response.data.error);
  };
}
