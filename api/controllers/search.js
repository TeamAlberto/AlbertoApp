var https = require("https"),
    express = require('express'),
    router = express.Router(),
    config = require('./../../config/config');

module.exports = function (app) {
  app.use('/', router);
};

function request(resource, params, callback) {
  params.ahpikey = config.ahApiKey;
  var url = "https://frahmework.ah.nl/!ahpi/" + resource + ".php?";

  var paramArr = [];
  for (var k in params) {
    paramArr.push(k + "=" + params[k]);
  }

  url += paramArr.join("&");

  console.log(url);

  https.get(url, function(res) {

    var buf = "";

    res.on('data', function(d) {
      buf += d;
    });

    res.on('end', function() {
      callback(false, JSON.parse(buf));
    });

  }).on('error', function(e) {
    callback(e, null);
  });
}

router.get('/search/:query', function (req, res, next) {

  request("artikelinfo", { 
    artikelomschrijving: req.params.query
  }, function(err, data) {
    if (err) {
      res.json({
        success: false,
        error: err
      })
    } else {

      // pretty data
      var products = [];

      var n = data.length;
      for (var i = 0; i < n; i++) {
        var product = data[i];

        var nameRegexp = new RegExp("\\s+" + req.params.query, "ig");

        // Validate incoming data
        if (product.artikelomschrijving &&
            product.imageid &&
            product.imageid != "noimage" &&
            product.breedte && product.hoogte &&
            product.huidigeprijs &&
            product.inhoud &&
            product.huidigevoorraad > 0 &&
            nameRegexp.test(product.artikelomschrijving)
            ) {

          var name = product.artikelomschrijving;
          name = name.substring(0, 1).toUpperCase() + name.substring(1);
          products.push({
            id: product.nasanr,
            name: name,
            image: "https://frahmework.ah.nl/!data/products/jpg/" + product.imageid + ".jpg",
            price: product.huidigeprijs
          });
        }
      }

      res.json({
        query: req.params.query,
        success: true,
        numResults: products.length,
        products: products
        // raw: data
      });
    }
  });

});