import { expect } from 'chai'
import Spotify from '../src/Spotify'
import { SinonStub, stub } from 'sinon'
import { AxiosResponse } from 'axios'

const clientConfig = {
  headers: {
    Authorization: 'Bearer token',
    'Content-Type': 'application/json'
  },
  method: 'GET'
}

describe('Spotify', () => {
  let spotify: Spotify
  let httpMock: SinonStub

  beforeEach(() => {
    spotify = new Spotify('token')
    httpMock = stub(spotify, 'client')
  })

  afterEach(() => {
    httpMock.restore()
  })

  it('should find the methods', () => {
    expect(spotify.getAPI).to.exist
    expect(spotify.getToken).to.exist
    expect(spotify.getAlbum).to.exist
    expect(spotify.getAlbums).to.exist
    expect(spotify.getArtist).to.exist
    expect(spotify.getArtists).to.exist
    expect(spotify.getGenres).to.exist
    expect(spotify.getRecommendations).to.exist
  })

  it('should create a spotify instance with valid token and api', () => {
    expect(spotify).to.be.instanceof(Spotify)
    expect(spotify.token).to.not.be.empty
    expect(spotify.api).to.not.be.empty
  })

  describe('should only allow valid token and api', () => {
    it('should not set token if empty and throw an Error', () => {
      expect(() => spotify.setToken('')).to.throw('Invalid token')
    })

    it('should correctly set the token when valid', () => {
      spotify.setToken('new token')
      expect(spotify.getToken()).to.eq('new token')
    })
  })

  describe('request', () => {
    beforeEach(() => {
      // TODO: test request
    })
  })

  describe('response', () => {
    it('should return the data when status is 200 [OK]', () => {
      const response: AxiosResponse = {
        config: undefined,
        headers: undefined,
        statusText: '',
        data: { foo: 'bar' },
        status: 200
      }

      const data = spotify.handleResponse(response)
      expect(data).to.eq(response.data)
    })

    it('should throw error when status is not 200', () => {
      const response: AxiosResponse = {
        config: undefined,
        headers: undefined,
        statusText: '',
        data: { error: { message: 'Error', status: 400 } },
        status: 400
      }

      expect(() => spotify.handleResponse(response)).to.throw
    })
  })
})
