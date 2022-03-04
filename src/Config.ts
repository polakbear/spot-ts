import axios, {AxiosInstance} from "axios";

const DEFAULT_API = 'https://api.spotify.com/v1'

export default class Config {
    public api: string

    public token: string

    constructor(token: string, api: string = DEFAULT_API) {
        this.token = token
        this.api = api
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

    public setApi(api: string): void {
        if (api.trim() === '') {
            throw new Error('Invalid API')
        }
        this.api = api
    }

    public getApi(): string {
        return this.api
    }
}