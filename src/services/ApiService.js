import axios from "axios";
import CommonMethods from "../CommonMethods";
import User from "../entities/User";

const ApiPrefix = 'http://ucezz.sytes.net/Projects/mirea/uhost/api/v1/';
const ApiSuffix = '.php';

/**
 * Common GET
 * @param {string} apiMethod API method
 * @param {*} headers Request headers
 * @param {function} callback Callback function on success `func(data)`
 * @param {function} error Callback function on error `func(error)`
 */
function commonGet(apiMethod, headers, callback, error) {
    axios
        .get(ApiPrefix + apiMethod + ApiSuffix, { headers: headers })
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
 * @param {*} headers Request headers
 * @param {function} callback Callback function on success `func(data)`
 * @param {function} error Callback function on error `func(error)`
 */
function commonPost(apiMethod, body, headers, callback, error) {
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
     * @param {*} token Authentication token
     * @param {*} callback Callback function on success `func(user)`
     * @param {function} error Callback function on error `func(error)`
     */
    static authenticate(token, callback, error) {
        if (token) {
            commonGet('user/index',
                { Authorization: `UcezZ ${token}` },
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
     * @param {function} callback Callback function on success `func(token)`
     * @param {function} error Callback function on error `func(response)`
     */
    static login(form, callback, error) {
        if (form) {
            let formData = CommonMethods.convertHTMLFormToFormData(form);
            commonPost(
                'auth/login',
                formData,
                {},
                e => callback(e.result.token),
                error);
        }
    }
}
