import Enumerable from "linq";
import Video from "./Video";

export default class Playlist {
    id;
    userId;
    name;
    videos;

    constructor(data) {
        if (!data) {
            data = {};
        }
        if (typeof (data) === 'string') {
            data = JSON.parse(data);
        }
        this.id = data.id ?? 0;
        this.userId = data.userId ?? 0;
        this.name = data.name ?? '';
        this.videos = data.videos ? Enumerable
            .from(data.videos)
            .select(e => new Video(e)) : [];
    }

    /**
     * Fill this entity from other entity
     * @param {Playlist} playlist 
     */
    fillFrom(playlist) {
        if (playlist instanceof Playlist) {
            this.id = playlist.id;
            this.userId = playlist.id;
            this.name = playlist.name;
            this.videos = playlist.videos;
        }
    }

    //#region Getters
    /**
     * ID
     * @returns {Number}
     */
    getId() { return this.id; }

    /**
     * User ID
     * @returns {Number}
     */
    getUserId() { return this.userId; }

    /**
     * Name
     * @returns {string}
     */
    getName() { return this.name; }

    /**
     * Video list
     * @returns {Video[]}
     */
    getVideos() { return this.videos; }
    //#endregion
}