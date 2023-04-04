import axios from "axios";
import Enumerable from "linq";
import Common from "../Common";
import User from "../entities/User";
import Video from "../entities/Video";
import Comment from "../entities/Comment";

const ApiPrefix = 'http://ucezz.sytes.net/Projects/mirea/uhost/api/v1/';
const ApiSuffix = '.php';

/**
 * Common GET
 * @param {string} apiMethod API method
 * @param {Array} headers Request headers
 * @param {function(*)} callback Callback function on success
 * @param {function(*)} error Callback function on error
 */
function commonGet(apiMethod, headers, params, callback, error) {
    if (navigator.languages) {
        headers['Accept-Language'] = navigator.languages.join(',');
    } else if (navigator.language) {
        headers['Accept-Language'] = navigator.language;
    }
    axios
        .get(ApiPrefix + apiMethod + ApiSuffix, { headers: headers, params: params })
        .then(res => {
            if (res.data) {
                if (callback) {
                    callback(res.data);
                }
            } else {
                if (error) {
                    error(res);
                }
            }
        })
        .catch(err => {
            if (error) {
                error(err);
            }
        });
}

/**
 * Common POST
 * @param {string} apiMethod API method
 * @param {*} body Request body
 * @param {Array} headers Request headers
 * @param {function(*)} callback Callback function on success
 * @param {function(*)} error Callback function on error
 */
function commonPost(apiMethod, body, headers, callback, error) {
    if (navigator.languages) {
        headers['Accept-Language'] = navigator.languages.join(',');
    } else if (navigator.language) {
        headers['Accept-Language'] = navigator.language;
    }
    axios
        .post(ApiPrefix + apiMethod + ApiSuffix, body, { headers: headers })
        .then(res => {
            if (res.data) {
                if (callback) {
                    callback(res.data);
                }
            } else {
                if (error) {
                    error(res);
                }
            }
        })
        .catch(err => {
            if (error) {
                error(err);
            }
        });
}

export default class ApiService {
    /**
     * User authentication
     * @param {string} token Authentication token
     * @param {function(User)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static authenticate(token, callback, error) {
        if (token) {
            commonGet('user/index',
                { Authorization: `UcezZ ${token}` },
                null,
                e => {
                    if (e.success && e.success === true) {
                        callback(new User(e.result));
                    } else {
                        error(e);
                    }
                },
                error
            );
        }
    }

    /**
     * User authorization
     * @param {HTMLFormElement} form Login form
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static login(form, callback, error) {
        if (form) {
            commonPost(
                'auth/login',
                Common.convertHTMLFormToFormData(form),
                {},
                e => callback(e.result),
                error);
        }
    }

    /**
     * User logout
     * @param {string} token Authentication token
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static logout(token, callback, error) {
        if (token) {
            commonPost(
                'auth/logout',
                null,
                { Authorization: `UcezZ ${token}` },
                callback,
                error
            );
        }
    }

    /**
     * Getting user by ID
     * @param {string} token Authentication token
     * @param {number} id User ID
     * @param {function(User)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static getUser(token, id, callback, error) {
        if (token && id && id > 0) {
            commonGet('user/index',
                { Authorization: `UcezZ ${token}` },
                { id: id },
                e => {
                    if (e.success && e.success === true) {
                        callback(new User(e.result));
                    } else {
                        error(e);
                    }
                },
                error
            );
        }
    }

    /**
     * Edit user
     * @param {string} token Authentication token
     * @param {HTMLFormElement} form User editor form
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static editUser(token, form, callback, error) {
        if (token && form) {
            commonPost(
                'user/index',
                Common.convertHTMLFormToFormData(form),
                { Authorization: `UcezZ ${token}` },
                callback,
                error
            )
        }
    }

    /**
     * Change password
     * @param {string} token Authentication token
     * @param {HTMLFormElement} form User password change form
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static changePassword(token, form, callback, error) {
        if (token && form) {
            commonPost(
                'user/change-password',
                Common.convertHTMLFormToFormData(form),
                { Authorization: `UcezZ ${token}` },
                callback,
                error
            )
        }
    }

    /**
     * Random videos
     * @param {string} token Authentication token
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static getRandomVideos(token, callback, error) {
        commonGet('video/index',
            token ? { Authorization: `UcezZ ${token}` } : {},
            {},
            e => {
                if (e.success && e.success === true) {
                    callback(e.result);
                } else {
                    error(e);
                }
            },
            error
        );
    }

    /**
     * User videos paged
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static getUserVideos(token, id, page, callback, error) {
        commonGet('video/index',
            { Authorization: `UcezZ ${token}` },
            {
                u: id,
                page: page
            },
            e => {
                if (e.success && e.success === true) {
                    callback(e.result);
                } else {
                    error(e);
                }
            },
            error
        );
    }

    /**
     * Video by alias
     * @param {string} token Authentication token
     * @param {string} alias Video alias
     * @param {function(*)} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static getVideoByAlias(token, alias, callback, error) {
        commonGet('video/index',
            token ? { Authorization: `UcezZ ${token}` } : {},
            { v: alias },
            e => {
                if (e.success && e.success === true) {
                    callback(new Video(e.result));
                } else {
                    error(e);
                }
            },
            error
        );
    }

    /**
     * Comments by alias
     * @param {string} alias Video alias
     * @param {function(Comment[])} callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static getCommentsByVideoAlias(token, alias, callback, error) {
        commonGet('comment/index',
            token ? { Authorization: `UcezZ ${token}` } : {},
            { v: alias },
            e => {
                if (e.success && e.success === true) {
                    callback(
                        Enumerable
                            .from(e.result)
                            .select(c => new Comment(c)));
                } else {
                    error(e);
                }
            },
            error
        );
    }

    /**
     * Get playback queue
     * @param {string} token Authentication token
     * @param {string} alias Video alias
     * @param {Number} playlist Playlist ID
     * @param {function (Number, Video[]) } callback Callback function on success
     * @param {function(*)} error Callback function on error
     */
    static getQueue(token, alias, playlist, callback, error) {
        commonGet('queue/index',
            token ? { Authorization: `UcezZ ${token}` } : {},
            {
                v: alias,
                p: playlist
            },
            e => {
                if (e.success && e.success === true) {
                    callback(e.result.playlist,
                        Enumerable
                            .from(e.result.queue)
                            .select(v => new Video(v)));
                } else {
                    error(e);
                }
            },
            error
        );
    }
}
