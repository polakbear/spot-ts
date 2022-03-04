"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
var Track = /** @class */ (function () {
    function Track(response) {
        this.album = response.album;
        this.artists = response.artists;
        this.available_markets = response.available_markets;
        this.duration_ms = response.duration_ms;
        this.external_urls = response.external_urls;
        this.href = response.href;
        this.id = response.id;
        this.name = response.name;
        this.popularity = response.popularity;
        this.uri = response.uri;
    }
    return Track;
}());
exports.Track = Track;
