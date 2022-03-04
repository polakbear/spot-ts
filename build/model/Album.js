"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
var Album = /** @class */ (function () {
    function Album(response) {
        this.artists = response.artists;
        this.external_urls = response.external_urls;
        this.genres = response.genres;
        this.href = response.href;
        this.id = response.id;
        this.images = response.images;
        this.name = response.name;
        this.popularity = response.popularity;
        this.release_date = response.release_date;
        this.uri = response.uri;
    }
    return Album;
}());
exports.Album = Album;
