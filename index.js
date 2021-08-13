const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const Settings = require('./components/Settings.jsx');
const ThemeMenu = require('../pc-moduleManager/components/manage/Themes.jsx');
const { React } = require('powercord/webpack');
const i18n = require('./i18n');
const commands = require('./commands');

module.exports = class ThemeToggler extends Plugin {
    startPlugin() {
        this.registerMain();
        this.loadStylesheet('style.scss');
        powercord.api.i18n.loadAllStrings(i18n);
        let extButton;
        inject('theme-toggler-in-menu', ThemeMenu.prototype, 'render', (args, res) => {
          try {
            const settings = React.createElement(Settings);
            extButton = res.props.children[1].props.children[0].props.children[1].props.children[0];
            res.props.children[1].props.children[0] = null;
            res.props.children[1].props.children[1] = null;
            res.props.children[1].props.children[2] = settings;
          }
          catch {}
          return res;
        });
        inject('theme-toggler-plus-store-button', Settings.prototype, 'render', (args, res) => {
          const dots = res.props.children[0].props.children[1].props.children.pop();
          res.props.children[0].props.children[1].props.children.push(extButton);
          res.props.children[0].props.children[1].props.children.push(dots);
          return res;
        });
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('theme');
        uninject('quick-css-toggle-switch');
        uninject('theme-toggler-in-menu');
        uninject('theme-toggler-plus-store-button');
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