const { Plugin } = require('powercord/entities');

const Settings = require('./components/Settings.jsx');

module.exports = class ThemeToggler extends Plugin {
    startPlugin() {
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