const modalInlineStyles = {
    overlay: {
        backgroundColor: '#000A',
        paddingTop: '48px',
        zIndex: 1488
    }
}

export default class CommonMethods {
    /**
     * Converts form to FormData
     * @param {HTMLFormElement} form 
     * @returns {FormData}
     */
    static convertHTMLFormToFormData(form) {
        let formData = new FormData();
        for (let i in form.elements) {
            if (form.elements[i] instanceof HTMLInputElement) {
                formData.append(form.elements[i].name, form.elements[i].value);
            }
        }

        return formData;
    }

    /**
     * Gathers search params
     * @returns {Dictionary<string,string>}
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

    static errorHandler(error) {

    }

    static getModalInlineStyles() {
        return modalInlineStyles;
    }
}