const { Plugin } = require('powercord/entities');

const Settings = require('./components/Settings.jsx');
const i18n = require('./i18n');

module.exports = class ThemeToggler extends Plugin {
    startPlugin() {
        this.loadStylesheet('style.scss');
        powercord.api.i18n.loadAllStrings(i18n);
        powercord.api.settings.registerSettings('theme-toggler', {
            category: this.entityID,
            label: 'Theme Toggler',
            render: Settings
        });
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings('theme-toggler');
    }
}