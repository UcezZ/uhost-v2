import User from './../entities/User';
import Enumerable from 'linq';
import './../css/theme.css';

const themeToken = '__theme_';
const data = [
    'dark',
    'light',
    'PH'
];

/**
 * Theme service
 */
export default class ThemeService {
    theme;

    /**
     * Creates theme service based on user settings
     * @param {User} user 
     */
    constructor(user) {
        Enumerable
            .from(document.getElementsByTagName('html')[0].classList)
            .where(e => e.startsWith(themeToken))
            .toArray()
            .forEach(e => document.getElementsByTagName('html')[0].classList.remove(e));
        this.theme = user && user instanceof User && user.getTheme() && data.includes(user.getTheme()) ? user.getTheme() : data[0];
        document.getElementsByTagName('html')[0].classList.add(`${themeToken}${this.theme}`);
    }

    /**
     * Returns current theme
     * @returns {string}
     */
    getTheme() {
        return this.theme;
    }

    /**
     * Returns list of supported themes
     * @returns {[string]}
     */
    static getSupportedThemes() {
        return data;
    }
}