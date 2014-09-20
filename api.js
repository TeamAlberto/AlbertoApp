var express = require('express'),
  config = require('./config/config'),
  cors = require('cors'),
  glob = require('glob');

var models = glob.sync(config.root + '/api/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

app.use(cors());

require('./config/express')(app, config);

app.listen(config.port);

console.log("Listening on port " + config.port);
