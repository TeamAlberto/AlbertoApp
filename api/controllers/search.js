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

  var now = new Date().getTime();
  https.get(url, function(res) {

    var buf = "";

    res.on('data', function(d) {
      buf += d;
    });

    res.on('end', function() {
      callback(false, { time: new Date().getTime() - now, data: JSON.parse(buf) });
    });

  }).on('error', function(e) {
    callback(e, null);
  });
}

router.get('/search/:query', function (req, res, next) {

  var now = new Date().getTime();
  if (req.params.query.length < 3) {
    res.json({
      query: req.params.query,
      success: false,
      error: "Query too short.",
      numResults: 0,
      products: [],
      time: new Date().getTime() - now,
      apiTime: 0
    });
    return;
  }

  request("artikelinfo", { 
    artikelomschrijving: req.params.query
  }, function(err, response) {
    if (err) {
      res.json({
        success: false,
        error: err
      })
    } else {

      var data = response.data;

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
            price: product.huidigeprijs,
            width: product.breedte,
            height: product.hoogte
          });
        }
      }

      res.json({
        query: req.params.query,
        success: true,
        numResults: products.length,
        products: products,
        time: new Date().getTime() - now,
        apiTime: response.time
      });
    }
  });

});

router.get('/categories', function(req, res, next) {

  var output = [];

  function req(assgroepnr) {
    
    if (assgroepnr < 1000) {

      if (validCategories.indexOf(assgroepnr) >= 0) {
        console.log("Checking " + assgroepnr + "..");
        request("artikelinfo", { assgroepnr: assgroepnr }, function(err, response) {
          var data = response.data;
          if (data.length > 0) {
            var content = [];
            var contentMap = {};
            var numSizes = 0;
            var averageSize = {
              width: 0,
              height: 0
            }

            for (var i = 0; i < data.length; i++) {
              var contentArr = data[i].inhoud.split(" ");
              var suffix = contentArr[contentArr.length - 1];
              if (!contentMap[suffix]) {
                contentMap[suffix] = true;
                content.push(suffix);
              }
              if (data[i].breedte && data[i].hoogte) {
                numSizes++;
                averageSize.width += data[i].breedte;
                averageSize.height += data[i].hoogte;
              }
            }

            averageSize.width /= numSizes;
            averageSize.height /= numSizes;

            output.push({
              assgroepnr: assgroepnr,
              name: data[0].assgroepomschrijving,
              content: content,
              dimensions_available: Math.round(100 * (numSizes / data.length)) + "%",
              average_dimensions: {
                width: averageSize.width,
                height: averageSize.height
              }
            });
          }

          req(assgroepnr + 1);
        });
      } else {
        console.log("Ignoring " + assgroepnr);
        req(assgroepnr + 1);
      }
    } else {
      res.json(output);
    }
  }

  req(1);

});