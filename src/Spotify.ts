import {AxiosResponse} from "axios";
import {Artist} from "./model/Artist";
import Client from "./Client";

export default class Spotify {
    public client: Client

    constructor(client: Client) {
        this.client = client
    }

    public async getArtist(id: string): Promise<Artist> {
        const response: AxiosResponse = await this.client.request(`artists/${id}`)
        const data = Spotify.handleResponse(response)
        return new Artist(data)
    }

    private static handleResponse(response: AxiosResponse) {
        if (response.status <= 204 && response.status >= 200) {
            return response.data
        }
        throw new Error(response.data.error)
    }
}