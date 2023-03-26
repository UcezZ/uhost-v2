import Common from '../Common';
import User from './User';

export default class Video {
    id;
    user;
    duration;
    name;
    alias;
    isPublic;
    time;
    humantime;
    user;
    humanduration;
    thumbUrl;
    videoUrl;
    downloadUrl;

    constructor(data) {
        this.id = data.id ?? 'N/A';
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

    //#region Getters
    /**
     * Id
     * @returns {int}
     */
    getId() { return this.id; }

    /**
     * User
     * @returns {User}
     */
    getUser() { return this.user; }

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
     * 
     * @returns {Date}
     */
    getTime() { return this.time; }

    getHumanTime() { return this.humantime; }
    getUser() { return this.user; }
    getThumbUrl() { return this.thumbUrl; }
    getVideoUrl() { return this.videoUrl; }
    getDownloadUrl() { return this.downloadUrl; }
    //#endregion
}