var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/search/:query', function (req, res, next) {

  res.json({query: req.params.query});

});
