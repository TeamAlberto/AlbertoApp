var express = require('express'),
    router = express.Router(),
    config = require('./../../config/config');

var db;

module.exports = function (app) {
  app.use('/', router);
};

router.post('/add', function (req, res, next) {
	var data = req.body;
	console.log(data);

	res.json({
		success: true
	});
});