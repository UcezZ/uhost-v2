import User from "./User";
import Video from "./Video";

export default class Comment {
    humantime;
    user;
    text;
    video;

    constructor(data) {
        if (typeof (data) === 'string') {
            data = JSON.parse(data);
        }

        this.id = data.id ?? 0;
        this.humantime = data.humantime ?? null;
        this.user = new User(data.user ?? null);
        this.video = new Video(data.video ?? null);
        this.text = data.text ?? '';

        if (data.userId) {
            this.user.id = data.userId;
        }
    }

    //#region Getters
    /**
     * Id
     * @returns {Number}
     */
    getId() { return this.id; }

    /**
     * Post human-readable time
     * @returns {string}
     */
    getHumanTime() { return this.humantime; }

    /**
     * Author
     * @returns {User}
     */
    getUser() { return this.user; }

    /**
     * Text
     * @returns {string}
     */
    getText() { return this.text; }

    /**
     * User ID
     * @returns  {Number}
     */
    getUserId() { return this.user.id; }
    /**
     * The video comment posted below
     * @returns {Video}
     */
    getVideo() { return this.video; }
    //#endregion
}