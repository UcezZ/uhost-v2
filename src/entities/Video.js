import Common from '../Common';
import User from './User';

export default class Video {
    id;
    userid;
    user;
    duration;
    name;
    alias;
    isPublic;
    time;
    humantime;
    humanduration;
    thumbUrl;
    videoUrl;
    downloadUrl;

    constructor(data) {
        if (!data) {
            data = {};
        }
        if (typeof (data) === 'string') {
            data = JSON.parse(data);
        }
        this.id = data.id ?? 'N/A';
        this.userid = data.userid ?? 0;
        this.user = data.user ? new User(data.user) : null;
        this.duration = data.duration ?? 'N/A';
        this.name = data.name ?? 'N/A';
        this.alias = data.alias ?? 'N/A';
        this.isPublic = data.isPublic ?? 'N/A';
        this.time = data?.time ? new Date(data.time) : new Date();
        this.humantime = data.humantime ?? 'N/A';
        this.user = data.user ?? 'N/A';
        this.humanduration = data.humanduration ?? 'N/A';
        this.thumbUrl = Common.getServerRoot() + data.thumbUrl ?? 'N/A';
        this.videoUrl = Common.getServerRoot() + data.videoUrl ?? 'N/A';
        this.downloadUrl = Common.getServerRoot() + data.downloadUrl ?? 'N/A';
    }

    /**
     * Fill this entity from other entity
     * @param {Video} entity 
     */
    fillFrom(entity) {
        if (entity && entity instanceof Video) {
            this.id = entity.id;
            this.userid = entity.userid;
            this.user = entity.user;
            this.duration = entity.duration;
            this.name = entity.name;
            this.alias = entity.alias;
            this.isPublic = entity.isPublic;
            this.time = entity.time;
            this.humantime = entity.humantime;
            this.user = entity.user;
            this.humanduration = entity.humanduration;
            this.thumbUrl = entity.thumbUrl;
            this.videoUrl = entity.videoUrl;
            this.downloadUrl = entity.downloadUrl;
        }
    }

    //#region Getters
    /**
     * Id
     * @returns {int}
     */
    getId() { return this.id; }

    /**
     * User ID
     * @returns {Number}
     */
    getUserId() { return this.userid; }

    /**
     * Duration in seconds
     * @returns {int}
     */
    getDuration() { return this.duration; }

    /**
     * Duration string
     * @returns {string}
     */
    getHumanDuration() { return this.humanduration; }

    /**
     * Video name
     * @returns {string}
     */
    getName() { return this.name; }

    /**
     * Video alias
     * @returns {string}
     */
    getAlias() { return this.alias; }

    /**
     * Is public
     * @returns {boolean}
     */
    getIsPublic() { return this.isPublic; }

    /**
     * Upload time object
     * @returns {Date}
     */
    getTime() { return this.time; }

    /**
     * Human-readable upload time
     * @returns {string}
     */
    getHumanTime() { return this.humantime; }

    /**
     * Video author
     * @returns {User}
     */
    getUser() { return this.user; }

    /**
     * Thumbnail URL
     * @param {string} token Authorization token
     * @returns 
     */
    getThumbUrl(token) { return this.thumbUrl + (token ? `&tk=${token}` : ''); }

    /**
     * Video stream URL
     * @param {string} token Authorization token
     * @returns 
     */
    getVideoUrl(token) { return this.videoUrl + (token ? `&tk=${token}` : ''); }

    /**
     * Video download URL
     * @param {string} token Authorization token
     * @returns 
     */
    getDownloadUrl(token) { return this.downloadUrl + (token ? `&tk=${token}` : ''); }
    //#endregion
}