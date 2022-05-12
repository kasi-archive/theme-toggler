const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { React } = require('powercord/webpack');

const Settings = require('./components/Settings');
const i18n = require('./i18n');
const commands = require('./commands');

const Base = require('../pc-moduleManager/components/manage/Base');
const Themes = require('../pc-moduleManager/components/manage/Themes');

module.exports = class ThemeToggler extends Plugin {
    startPlugin() {
        this.registerMain()
        this.loadStylesheet('style.css');
        powercord.api.i18n.loadAllStrings(i18n);
        powercord.api.settings.registerSettings('theme-toggler', {
            category: this.entityID,
            label: 'Theme Toggler',
            render: Settings
        });

        const _this = this;
        inject('tt-base-render', Base.prototype, 'render', function(_, res) {
          return this.state.key === 'THEMES' && _this.settings.get('integrate', false) ? this.renderBody() : res;
        });

        // powercord.api.settings.tabs[_this.entityID].render is the settings page connected to the flux decorator for this plugin
        inject('tt-themes-body', Themes.prototype, 'renderBody', function(_, res) {
          return _this.settings.get('integrate', false) ? React.createElement(powercord.api.settings.tabs[_this.entityID].render) : res;
        });
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings('theme-toggler');
        powercord.api.commands.unregisterCommand('theme');

        uninject('tt-base-render');
        uninject('tt-themes-body');
    }

    registerMain() {
        powercord.api.commands.registerCommand({
            command: 'theme',
            description: 'Enable and disable a theme.',
            usage: '{c} [ enable, disable ] [ theme ID ]',
            executor: (args) => {
              const subcommand = commands[args[0]];
              if (!subcommand) {
                return {
                  send: false,
                  result: `\`${args[0]}\` is not a valid subcommand. Specify one of ${Object.keys(commands).map(cmd => `\`${cmd}\``).join(', ')}.`
                };
              }
      
              return subcommand.executor(args.slice(1), this);
            },
            autocomplete: (args) => {
              if (args[0] !== void 0 && args.length === 1) {
                return {
                  commands: Object.values(commands).filter(({ command }) => command.includes(args[0].toLowerCase())),
                  header: 'theme subcommands'
                };
              }
      
              const subcommand = commands[args[0]];
              if (!subcommand || !subcommand.autocomplete) {
                return false;
              }
      
              return subcommand.autocomplete(args.slice(1), this.settings);
            }
          });
    }
}
