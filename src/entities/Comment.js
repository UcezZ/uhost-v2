import User from "./User";

export default class Comment {
    humantime;
    user;
    text;

    constructor(data) {
        if (typeof (data) === 'string') {
            data = JSON.parse(data);
        }

        this.humantime = data.humantime ?? null;
        this.user = new User(data.user ?? null);
        this.text = data.text ?? '';

        if (data.userId) {
            this.user.id = data.userId;
        }
    }

    //#region Getters
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
    //#endregion
}