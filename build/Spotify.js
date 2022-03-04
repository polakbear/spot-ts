"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Artist_1 = require("./model/Artist");
var Album_1 = require("./model/Album");
var DEFAULT_API = 'https://api.spotify.com/v1';
var Spotify = /** @class */ (function () {
    function Spotify(token, api) {
        if (api === void 0) { api = DEFAULT_API; }
        this.key = function (method) {
            return ['PUT', 'POST', 'PATCH', 'DELETE'].includes(method) ? 'data' : 'params';
        };
        this.handleResponse = function (response) {
            if (response.status <= 204 && response.status >= 200) {
                return response.data;
            }
            throw new Error(response.data.error);
        };
        this.addFormattedSeeds = function (query) {
            if (query.seed_artists && query.seed_artists.length) {
                Object.assign(query, {
                    seed_artists: query.seed_artists.join(',')
                });
            }
            if (query.seed_genres && query.seed_genres.length) {
                Object.assign(query, {
                    seed_genres: query.seed_genres.join(',')
                });
            }
            if (query.seed_tracks && query.seed_tracks.length) {
                Object.assign(query, {
                    seed_tracks: query.seed_tracks.join(',')
                });
            }
            return query;
        };
        this.api = api;
        this.token = token;
        this.client = axios_1.default.create({
            validateStatus: function (status) { return status < 500; }
        });
    }
    Spotify.prototype.setToken = function (token) {
        if (token.trim() === '') {
            throw new Error('Invalid token');
        }
        this.token = token;
    };
    Spotify.prototype.getToken = function () {
        return this.token;
    };
    Spotify.prototype.getAPI = function () {
        return this.api;
    };
    Spotify.prototype.getArtist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("artists/".concat(id))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new Artist_1.Artist(this.handleResponse(response))];
                }
            });
        });
    };
    Spotify.prototype.getArtists = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('artists', {
                            ids: "".concat(ids)
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response).artists.map(function (artist) { return new Artist_1.Artist(artist); })];
                }
            });
        });
    };
    Spotify.prototype.getAlbum = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("albums/".concat(id))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, new Album_1.Album(this.handleResponse(response))];
                }
            });
        });
    };
    Spotify.prototype.getAlbums = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('albums', {
                            ids: "".concat(ids)
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response).albums.map(function (album) { return new Album_1.Album(album); })];
                }
            });
        });
    };
    Spotify.prototype.getGenres = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('recommendations/available-genre-seeds')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response).genres];
                }
            });
        });
    };
    Spotify.prototype.getRecommendations = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.addFormattedSeeds(query);
                        return [4 /*yield*/, this.request('recommendations', query)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    Spotify.prototype.request = function (endpoint, params, headers, method) {
        var _this = this;
        if (method === void 0) { method = 'GET'; }
        return new Promise(function (resolve, reject) {
            var _a;
            try {
                var request = {
                    headers: __assign(__assign({}, _this.createHeaders()), headers),
                    method: method,
                    url: "".concat(_this.getAPI(), "/").concat(endpoint)
                };
                if (params) {
                    request = __assign(__assign({}, request), (_a = {}, _a[_this.key(method)] = params, _a));
                }
                _this.client(request).then(resolve, function (e) {
                    reject(e);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    Spotify.prototype.createHeaders = function () {
        return {
            Authorization: "Bearer ".concat(this.token),
            'Content-Type': 'application/json'
        };
    };
    return Spotify;
}());
exports.default = Spotify;
