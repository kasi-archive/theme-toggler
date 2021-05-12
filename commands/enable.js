module.exports = {
    command: 'enable',
    description: 'Allows you to enable a selected theme from the given list.',
    usage: '{c} [ theme ID ]',
    executor (args) {
      let result;
      const themeID = powercord.styleManager.getThemes().find(theme => theme.toLowerCase() === args[0].toLowerCase());
  
      if (powercord.styleManager.themes.has(themeID)) {
        if (powercord.styleManager.isEnabled(themeID)) {
          result = `->> ERROR: Tried to load an already loaded theme!
              (${themeID})`;
        } else {
          powercord.styleManager.enable(themeID);
          result = `+>> SUCCESS: Theme loaded!
              (${themeID})`;
        }
      } else {
        result = `->> ERROR: Tried to enable a non-installed theme!
            (${args[0]})`;
      }
  
      return {
        send: false,
        result: `\`\`\`diff\n${result}\`\`\``
      };
    },
    autocomplete (args) {
      const themes = powercord.styleManager.getThemes()
        .sort((a, b) => a - b)
        .map(theme => powercord.styleManager.themes.get(theme));
  
      if (args.length > 1) {
        return false;
      }
  
      return {
        commands: themes
          .filter(theme => theme.entityID.toLowerCase().includes(args[0].toLowerCase()))
          .map(theme => ({
            command: theme.entityID,
            description: theme.manifest.description
          }))
          .slice(0, 10),
        header: 'powercord theme list'
      };
    }
  };