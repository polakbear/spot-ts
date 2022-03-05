/*
  "danceability": 0.107,
  "energy": 0.032,
  "key": 2,
  "loudness": -29.055,
  "mode": 0,
  "speechiness": 0.0503,
  "acousticness": 0.994,
  "instrumentalness": 0.942,
  "liveness": 0.0865,
  "valence": 0.0317,
  "tempo": 84.329,
  "type": "audio_features",
  "id": "3qmBqj3EmghQ4UayTRBbL1",
  "uri": "spotify:track:3qmBqj3EmghQ4UayTRBbL1",
  "track_href": "https://api.spotify.com/v1/tracks/3qmBqj3EmghQ4UayTRBbL1",
  "analysis_url": "https://api.spotify.com/v1/audio-analysis/3qmBqj3EmghQ4UayTRBbL1",
  "duration_ms": 343200,
 */

export class AudioFeatures {
  public danceability: string;
  public energy: string;
  public key: number;
  public loudness: string;
  public mode: number;
  public speechiness: string;
  public acousticness: string;
  public instrumentalness: string;
  public liveness: string;
  public valence: string;
  public tempo: string;
  public id: string;
  public uri: string;
  public track_href: string;
  public duration_ms: number;

  constructor(response: AudioFeatures) {
    this.danceability = response.danceability;
    this.energy = response.energy;
    this.key = response.key;
    this.loudness = response.loudness;
    this.mode = response.mode;
    this.speechiness = response.speechiness;
    this.acousticness = response.acousticness;
    this.instrumentalness = response.instrumentalness;
    this.liveness = response.liveness;
    this.valence = response.valence;
    this.tempo = response.tempo;
    this.id = response.id;
    this.uri = response.uri;
    this.track_href = response.track_href;
    this.duration_ms = response.duration_ms;
  }
}
