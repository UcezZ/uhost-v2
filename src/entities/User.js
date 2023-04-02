export default class User {
    id;
    roleId;
    role;
    login;
    name;
    info;
    locale;
    theme;
    videos;
    playlists;

    constructor(data = {}) {
        if (typeof (data) === 'string') {
            data = JSON.parse(data);
        }
        this.id = data.id ?? 0;
        this.roleId = data.roleId ?? 0;
        this.role = data.role ?? 'N/A';
        this.login = data.login ?? 'N/A';
        this.name = data.name ?? 'N/A';
        this.info = data.info ?? '';
        this.locale = data.locale ?? 'en';
        this.theme = data.theme ?? 'dark';
        this.videos = data.videos ?? 0;
        this.playlists = data.playlists ?? 0;
    }
    //#region Getters
    /**
     * Id
     * @returns {Number}
     */
    getId() { return this.id; }

    /**
     * Login
     * @returns {string}
     */
    getLogin() { return this.login; }

    /**
     * Name
     * @returns {string}
     */
    getName() { return this.name; }

    /**
     * Info
     * @returns {string}
     */
    getInfo() { return this.info; }

    /**
     * Locale
     * @returns {string}
     */
    getLocale() { return this.locale; }

    /**
     * Theme
     * @returns {string}
     */
    getTheme() { return this.theme; }

    /**
     * Role name
     * @returns {string}
     */
    getRole() { return this.role; }
    /**
     * Is admin
     * @returns {boolean}
     */
    isAdmin() { return this.roleId === 1; }

    /**
     * User's video count
     * @returns {Number}
     */
    getVideoCount() { return this.videos; }

    /**
     * User's playlist count
     * @returns {Number}
     */
    getPlaylistCount() { return this.playlists; }
    //#endregion
}