import Enumerable from "linq";

const modalInlineStyles = {
    overlay: {
        backgroundColor: '#000A',
        paddingTop: '12.5vh',
        zIndex: 1488
    }
}

const tokenCookieKey = 'token';
const tokenLifetime = 3600000;
const commentsUpdateThreshold = 15000;

export default class Common {
    /**
     * Converts form to `FormData`
     * @param {HTMLFormElement} form 
     * @returns {FormData}
     */
    static convertHTMLFormToFormData(form) {
        let formData = new FormData(form);

        return formData;
    }

    /**
     * Converts array to `FormData`
     * @param {Object} array Params dictionary
     * @returns {FormData}
     */
    static convertArrayToFormData(array) {
        let formData = new FormData();

        for (let key in array) {
            formData.append(key, array[key]);
        }

        return formData
    }

    /**
     * Gathers search params
     * @returns {Object}
     */
    static getSearchParams() {
        let params = {};
        window.location.search
            .split('&')
            .forEach(e => {
                let param = e.split('=');
                params[param[0]] = param[1] ?? null;
            });

        return params;
    }

    static getModalInlineStyles() { return modalInlineStyles; }

    static getTokenKey() { return tokenCookieKey; }

    static getTokenLifetime() { return tokenLifetime; }

    static getCommentsUpdateThreshold() { return commentsUpdateThreshold; }

    /**
     * Turns on hidden confirmation trigger on control change
     * @param {*} e OnClick event data
     */
    static formChangeTrigger(e) {
        if (e.target.form instanceof HTMLFormElement) {
            Enumerable
                .from(e.target.form.elements)
                .where(e => e instanceof HTMLInputElement)
                .where(e => e.type === 'checkbox' && e.style.display === 'none' && e.required)
                .forEach(e => e.checked = true);
        }
    }
}