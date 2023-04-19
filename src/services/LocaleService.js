import data from './lang.json';

export default class LocaleService {
    user;

    constructor(user) {
        this.user = user;
    }

    gatherLocale(locale) {
        if (locale) {
            locale = locale.toLowerCase();
            if (data[locale]) {
                return locale;
            } else {
                return 'en';
            }
        }

        return this.gatherLocale(this.user ? this.user.getLocale() : LocaleService.gatherBrowserLocale() ?? 'en');
    }

    static gatherBrowserLocale() {
        return navigator.languages && navigator.languages.length ? navigator.languages[0].split('-')[0].toLowerCase() : (navigator.language.split('-')[0].toLowerCase());
    }

    getValue(alias, locale = null) {
        alias = alias.toLowerCase();
        let gatheredString = data[this.gatherLocale(locale)]['data'][alias];
        if (gatheredString) {
            return gatheredString;
        }

        let defaultString = data['en']['data'][alias];
        if (defaultString) {
            return defaultString;
        }

        return alias;
    }

    static getSupportedLocales() {
        let locales = {};
        for (let lc in data) {
            locales[lc] = data[lc]['caption'];
        }

        return locales;
    }
}