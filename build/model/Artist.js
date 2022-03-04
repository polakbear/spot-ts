"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
var Artist = /** @class */ (function () {
    function Artist(response) {
        this.external_urls = response.external_urls;
        this.genres = response.genres;
        this.href = response.href;
        this.id = response.id;
        this.images = response.images;
        this.name = response.name;
        this.popularity = response.popularity;
        this.type = response.type;
        this.uri = response.type;
    }
    return Artist;
}());
exports.Artist = Artist;
