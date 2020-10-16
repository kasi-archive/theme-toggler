const { Plugin } = require('powercord/entities');

const Settings = require('./components/Settings.jsx');
const i18n = require('./i18n');
const commands = require('./commands');

module.exports = class ThemeToggler extends Plugin {
    startPlugin() {
        Object.values(commands).forEach(cmd => powercord.api.commands.registerCommand(cmd));
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
        Object.values(commands).forEach(cmd => powercord.api.commands.unregisterCommand(cmd.command));
    }
}