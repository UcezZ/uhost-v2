import User from './../entities/User';

const data = [
    'dark',
    'light'
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
        this.theme = user && user.getTheme() && data.includes(user.getTheme()) ? user.getTheme() : data[0];
    }
    /**
     * Theme name
     * @returns {string}
     */
    gatherThemeName() {
        return this.theme;
    }

    /**
     * Imports stylesheet
     */
    importStyleSheet() {
        import(`./../css/theme/${this.gatherThemeName()}.css`);
    }
}