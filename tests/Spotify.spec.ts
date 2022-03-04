import { expect, use } from 'chai';
import Spotify from '../src/Spotify';
import { SinonStub, stub } from 'sinon';
import { AxiosResponse } from 'axios';
import 'mocha';
import sinonChai = require('sinon-chai');

use(sinonChai);

const clientConfig = {
  headers: {
    Authorization: 'Bearer token',
    'Content-Type': 'application/json',
  },
  method: 'GET',
};

describe('Spotify', () => {
  let spotify: Spotify;
  let httpMock: SinonStub;

  beforeEach(() => {
    spotify = new Spotify('token');
    httpMock = stub(spotify, 'client');
  });

  afterEach(() => {
    httpMock.restore();
  });

  it('should find the methods', () => {
    expect(spotify.getAPI).to.exist;
    expect(spotify.getToken).to.exist;
    expect(spotify.getAlbum).to.exist;
    expect(spotify.getAlbums).to.exist;
    expect(spotify.getArtist).to.exist;
    expect(spotify.getArtists).to.exist;
    expect(spotify.getGenres).to.exist;
    expect(spotify.getRecommendations).to.exist;
  });

  it('should create a spotify instance with valid token and api', () => {
    expect(spotify).to.be.instanceof(Spotify);
    expect(spotify.token).to.not.be.empty;
    expect(spotify.api).to.not.be.empty;
  });

  describe('should only allow valid token and api', () => {
    it('should not set token if empty and throw an Error', () => {
      expect(() => spotify.setToken('')).to.throw('Invalid token');
    });

    it('should correctly set the token when valid', () => {
      spotify.setToken('new token');
      expect(spotify.getToken()).to.eq('new token');
    });
  });

  describe('request', () => {
    describe('getArtist', () => {
      beforeEach(() => {
        httpMock.resolves({
          data: {
            external_urls: {
              spotify:
                'https://open.spotify.com/artists/08GQAI4eElDnROBrJRGE0X',
            },
            followers: {
              href: null,
              total: 7917837,
            },
            genres: [
              'album rock',
              'classic rock',
              'mellow gold',
              'rock',
              'soft rock',
              'yacht rock',
            ],
            href: 'https://api.spotify.com/v1/artists/08GQAI4eElDnROBrJRGE0X',
            id: '08GQAI4eElDnROBrJRGE0X',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5eb249d55f2d68a44637905c57e',
                width: 640,
              },
              {
                height: 320,
                url: 'https://i.scdn.co/image/ab67616100005174249d55f2d68a44637905c57e',
                width: 320,
              },
              {
                height: 160,
                url: 'https://i.scdn.co/image/ab6761610000f178249d55f2d68a44637905c57e',
                width: 160,
              },
            ],
            name: 'Fleetwood Mac',
            popularity: 83,
            type: 'artist',
            uri: 'spotify:artist:08GQAI4eElDnROBrJRGE0X',
          },
          status: 200,
        });
      });

      it('should call the client with the right parameters', async () => {
        await spotify.getArtist('08GQAI4eElDnROBrJRGE0X');
        expect(httpMock).to.have.been.calledWith({
          ...clientConfig,
          method: 'GET',
          url: 'https://api.spotify.com/v1/artists/08GQAI4eElDnROBrJRGE0X',
        });
      });
    });
  });

  describe('response', () => {
    it('should return the data when status is 200 [OK]', () => {
      const response: AxiosResponse = {
        config: undefined,
        headers: undefined,
        statusText: '',
        data: { foo: 'bar' },
        status: 200,
      };

      const data = spotify.handleResponse(response);
      expect(data).to.eq(response.data);
    });

    it('should throw error when status is not 200', () => {
      const response: AxiosResponse = {
        config: undefined,
        headers: undefined,
        statusText: '',
        data: { error: { message: 'Error', status: 400 } },
        status: 400,
      };

      expect(() => spotify.handleResponse(response)).to.throw;
    });
  });
});
