require('fs')
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(filename => {
    const moduleName = filename.split('.')[0];
    module.exports[moduleName] = require(`${__dirname}/${filename}`);
  });