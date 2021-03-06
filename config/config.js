var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'albertoapp'
    },
    port: 3000
  },

  test: {
    root: rootPath,
    app: {
      name: 'albertoapp'
    },
    port: 3000
  },

  production: {
    root: rootPath,
    app: {
      name: 'albertoapp'
    },
    port: 30002
  }
};

module.exports = config[env];

module.exports.ahApiKey = require("./ah");