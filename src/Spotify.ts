import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios'
import { Artist } from './model/Artist'
import { Album } from './model/Album'
import { AudioFeatures } from './model/AudioFeatures'
import { Recommendations } from './model/Recommendations'

const DEFAULT_API = 'https://api.spotify.com/v1'

export default class Spotify {
  public api: string
  public token: string
  public client: AxiosInstance

  constructor(token: string, api: string = DEFAULT_API) {
    this.api = api
    this.token = token
    this.client = axios.create({
      validateStatus: status => status < 500
    })
  }

  public setToken(token: string): void {
    if (token.trim() === '') {
      throw new Error('Invalid token')
    }
    this.token = token
  }

  public getToken(): string {
    return this.token
  }

  public getAPI(): string {
    return this.api
  }

  public async getArtist(id: string): Promise<Artist> {
    const response: AxiosResponse = await this.request(`artists/${id}`)
    const data = this.handleResponse(response)
    return new Artist(data)
  }

  public async getArtists(ids: string[]): Promise<Artist[]> {
    const response: AxiosResponse = await this.request('artists', {
      ids: `${ids}`
    })
    const data = this.handleResponse(response)
    return data.artists.map((artist: any) => new Artist(artist))
  }

  public async getAlbum(id: string): Promise<Album> {
    const response: AxiosResponse = await this.request(`albums/${id}`)
    const data = this.handleResponse(response)
    return new Album(data)
  }

  public async getAlbums(ids: string[]): Promise<Album[]> {
    const response: AxiosResponse = await this.request('albums', {
      ids: `${ids}`
    })
    const data = this.handleResponse(response)
    return data.albums.map((album: any) => new Album(album))
  }

  public async getGenres(): Promise<string[]> {
    const response: AxiosResponse = await this.request(
      'recommendations/available-genre-seeds'
    )
    const data = this.handleResponse(response)
    return data.genres
  }

  public async getRecommendations(
    query: AudioFeatures
  ): Promise<Recommendations> {
    query = this.addFormattedSeeds(query)
    const response: AxiosResponse = await this.request('recommendations', query)
    return this.handleResponse(response)
  }

  public request(
    endpoint: string,
    params?: AxiosRequestConfig['params'],
    headers?: Record<string, any>,
    method: Method = 'GET'
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let request = {
          headers: { ...this.createHeaders(), ...headers },
          method,
          url: `${this.getAPI()}/${endpoint}`
        }

        if (params) {
          request = { ...request, [this.getKey(method)]: params }
        }

        this.client(request).then(resolve, e => {
          reject(e)
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  private getKey(method: Method) {
    return ['PUT', 'POST', 'PATCH', 'DELETE'].some(m => m === method)
      ? 'data'
      : 'params'
  }

  private createHeaders(): Record<string, any> {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
  }

  private handleResponse = (response: AxiosResponse) => {
    if (response.status <= 204 && response.status >= 200) {
      return response.data
    }
    throw new Error(response.data.error)
  }

  private addFormattedSeeds = (query: AudioFeatures) => {
    if (query.seed_artists && query.seed_artists.length) {
      Object.assign(query, {
        seed_artists: query.seed_artists.join(',')
      })
    }
    if (query.seed_genres && query.seed_genres.length) {
      Object.assign(query, {
        seed_genres: query.seed_genres.join(',')
      })
    }
    if (query.seed_tracks && query.seed_tracks.length) {
      Object.assign(query, {
        seed_tracks: query.seed_tracks.join(',')
      })
    }

    return query
  }
}
