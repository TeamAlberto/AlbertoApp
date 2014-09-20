var https = require("https"),
    express = require('express'),
    router = express.Router(),
    config = require('./../../config/config'),

    categories = require('./../model/categories.json');

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

function getCategory(id) {
  var n = categories.length;
  for (var i = 0; i < n; i++) {
    if (categories[i].assgroepnr === id) return categories[i];
  }
  return null;
}

function getProductDimensions(product) {
  var width = 0;
  var height = 0;
  var depth = 0;
   var category = getCategory(product.assgroepnr);
   if (!category) return null;

  if (product.breedte && product.hoogte) {
    width = product.breedte;
    height = product.hoogte;
  } else {
    width = category.average_dimensions.width;
    height = category.average_dimensions.height;
  }

  depth = width * category.average_dimensions.depth;

  return {
    width: width,
    height: height,
    depth: depth
  };
}

function estimateWeight(product, productCategory, dimensions) {
  var contentArr = product.inhoud.split(" ");
  var unit = contentArr[contentArr.length - 1];
  var value = parseFloat(contentArr[0]);

  // in grams
  var weigth = 0;
  switch (unit) {
    case "KG":
    case "LT":
      weight = value * 1000;
      break;
    case "ML":
    case "GR":
      weight = value;
      break;
    case "CL":
      weight = value * 10;
      break;
    case "RL":
      // 1 roll of toilet paper is the same as kitchen paper. close enough.
      weight = value * 297; // http://encyclopedia.toiletpaperworld.com/toilet-paper-facts/toilet-paper-quick-facts
      break;
    default:
      weight = -1;
      break;
  }

  if (weight < 0) {
    // guesstimate!
    var volumeMM3 = dimensions.width * dimensions.height * dimensions.depth;
    var volumeCM3 = volumeMM3 / 1000;
    // weight is per 10 cm3, 10x10x10cm)
    weight = (volumeCM3 / 1000) * productCategory.weight;
  }

  return weight;
}

router.get('/mock/:query', function (req, res, next) {
  res.json({"query":"bie","success":true,"numResults":41,"products":[{"id":801495,"name":"Ah bsc pr lagerbier","image":"https://frahmework.ah.nl/!data/products/jpg/NASA801495-DATE12072013-EAN8717775816638.jpg","price":"0.52"},{"id":792270,"name":"Amstel bier 6bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA792270-DATE10092012-EAN8712000032050.jpg","price":"3.62"},{"id":521002,"name":"Amstel bier bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA521002-DATE06032013-EAN87120332.jpg","price":"0.73"},{"id":792271,"name":"Amstel bier bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA792271-DATE04092013-EAN87120226.jpg","price":"0.68"},{"id":565011,"name":"Amstel bier mono 12fl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA565011-DATE12122012-EAN8712000023379.jpg","price":"6.88"},{"id":562833,"name":"Jupiler bier 6bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA562833-DATE13082013-EAN5410228150404.jpg","price":"6.13"},{"id":751556,"name":"Tyskie bier bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA751556-DATE12122012-EAN5901359000237.jpg","price":"1.12"},{"id":99380,"name":"Warsteiner bier bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA99380-DATE12122012-EAN4000856003404.jpg","price":"1.12"},{"id":807569,"name":"Ah petrella met bieslook","image":"https://frahmework.ah.nl/!data/products/jpg/NASA807569-DATE06112013-EAN8718265814141.jpg","price":"2.13"},{"id":581358,"name":"Ah biefstukworst st","image":"https://frahmework.ah.nl/!data/products/jpg/NASA581358-DATE29072013-EAN2302657000005.jpg","price":"16.31"},{"id":615635,"name":"Biefstukworst pl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA615635-DATE28052013-EAN2351889000000.jpg","price":"19.78"},{"id":595590,"name":"Kipfilet met bieslook","image":"https://frahmework.ah.nl/!data/products/jpg/NASA595590-DATE14092012-EAN2351666000001.jpg","price":"14.35"},{"id":575847,"name":"Lichtpittig rosbief peper","image":"https://frahmework.ah.nl/!data/products/jpg/NASA575847-DATE15032013-EAN2248640000006.jpg","price":"20.04"},{"id":640387,"name":"Tosc biefstuk tapenade","image":"https://frahmework.ah.nl/!data/products/jpg/NASA640387-DATE20122012-EAN2352543000008.jpg","price":"21.94"},{"id":754526,"name":"Ah biefstuk","image":"https://frahmework.ah.nl/!data/products/jpg/NASA754526-DATE21022014-EAN8710400731849.jpg","price":"2.19"},{"id":754834,"name":"Calve sal mix ui bieslook","image":"https://frahmework.ah.nl/!data/products/jpg/NASA754834-DATE21102013-EAN8718114873374.jpg","price":"0.92"},{"id":592316,"name":"Ah rode bieten","image":"https://frahmework.ah.nl/!data/products/jpg/NASA592316-DATE20112012-EAN8710400377337.jpg","price":"0.67"},{"id":54776,"name":"Bond rode bietjes","image":"https://frahmework.ah.nl/!data/products/jpg/NASA54776-DATE20112012-EAN3083680022699.jpg","price":"0.88"},{"id":802247,"name":"Hak rode bieten met ui","image":"https://frahmework.ah.nl/!data/products/jpg/NASA802247-DATE02012013-EAN8720600609114.jpg","price":"1.41"},{"id":802254,"name":"Hak rode bieten schijven","image":"https://frahmework.ah.nl/!data/products/jpg/NASA802254-DATE02012013-EAN8720600609893.jpg","price":"1.86"},{"id":580188,"name":"Ah p&e b bieslook pot","image":"https://frahmework.ah.nl/!data/products/jpg/NASA580188-DATE21122012-EAN5400357009124.jpg","price":"1.74"},{"id":596050,"name":"Castello bieslook","image":"https://frahmework.ah.nl/!data/products/jpg/NASA596050-DATE20122012-EAN5760466771337.jpg","price":"1.23"},{"id":526595,"name":"Ah bieslook","image":"https://frahmework.ah.nl/!data/products/jpg/NASA526595-DATE26032013-EAN8710400186649.jpg","price":"1.30"},{"id":73649,"name":"Ah geraspte bietjes","image":"https://frahmework.ah.nl/!data/products/jpg/NASA73649-DATE01102012-EAN8718265343368.jpg","price":"2.05"},{"id":797335,"name":"Bieze coleslaw rauwkost","image":"https://frahmework.ah.nl/!data/products/jpg/NASA797335-DATE10092013-EAN8711145234701.jpg","price":"1.69"},{"id":797336,"name":"Bieze farmer rauwkost","image":"https://frahmework.ah.nl/!data/products/jpg/NASA797336-DATE10092013-EAN8711145234718.jpg","price":"1.39"},{"id":805986,"name":"Bieze griekse kool rauwk","image":"https://frahmework.ah.nl/!data/products/jpg/NASA805986-DATE10092013-EAN8711145234763.jpg","price":"2.01"},{"id":582963,"name":"Eur vd bieslook","image":"https://frahmework.ah.nl/!data/products/jpg/NASA582963-DATE14012014-EAN8717600098710.jpg","price":"2.13"},{"id":805053,"name":"Ah kaas bieslook soesjes","image":"https://frahmework.ah.nl/!data/products/jpg/NASA805053-DATE14032013-EAN8718265633476.jpg","price":"1.37"},{"id":752014,"name":"Bavaria 0,0 witbier 6fl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA752014-DATE12042013-EAN8714800022354.jpg","price":"3.34"},{"id":556236,"name":"Bavaria 0,0% bier 6bl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA556236-DATE03102013-EAN8714800025928.jpg","price":"2.96"},{"id":800647,"name":"Erdinger weissbier","image":"https://frahmework.ah.nl/!data/products/jpg/NASA800647-DATE29052013-EAN4002103000013.jpg","price":"1.90"},{"id":69119,"name":"Hoegaarden witbier 6fl","image":"https://frahmework.ah.nl/!data/products/jpg/NASA69119-DATE05032013-EAN5412421306015.jpg","price":"4.78"},{"id":761646,"name":"Hak rode bieten zz na","image":"https://frahmework.ah.nl/!data/products/jpg/NASA761646-DATE11122012-EAN8720600605703.jpg","price":"1.35"},{"id":637192,"name":"Ah bieflappen","image":"https://frahmework.ah.nl/!data/products/jpg/NASA637192-DATE20122012-EAN2352502000001.jpg","price":"15.93"},{"id":572511,"name":"Ah biefstuk 2 st","image":"https://frahmework.ah.nl/!data/products/jpg/NASA572511-DATE30102013-EAN8718265127968.jpg","price":"20.18"},{"id":799579,"name":"Ah biefstukpuntjes","image":"https://frahmework.ah.nl/!data/products/jpg/NASA799579-DATE26112013-EAN8718265647305.jpg","price":"5.62"},{"id":780673,"name":"Ah duitse biefstuk","image":"https://frahmework.ah.nl/!data/products/jpg/NASA780673-DATE11122013-EAN8718265399013.jpg","price":"2.80"},{"id":527528,"name":"Ah grf kogelbiefstuk","image":"https://frahmework.ah.nl/!data/products/jpg/NASA527528-DATE26112013-EAN8718265132771.jpg","price":"24.37"},{"id":527683,"name":"Ah grf rosbieflapjes","image":"https://frahmework.ah.nl/!data/products/jpg/NASA527683-DATE05112013-EAN8718265132818.jpg","price":"20.23"},{"id":643810,"name":"Ah malse lamsbiefstuk","image":"https://frahmework.ah.nl/!data/products/jpg/NASA643810-DATE26112013-EAN8710400725817.jpg","price":"31.85"}]});
});

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
        var productCategory = getCategory(product.assgroepnr);

        if (!productCategory) continue;

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

          var dimensions = getProductDimensions(product);

          products.push({
            id: product.nasanr,
            category: product.assgroepnr,
            name: name,
            image: "https://frahmework.ah.nl/!data/products/jpg/" + product.imageid + ".jpg",
            price: product.huidigeprijs,
            quantity: product.inhoud,
            dimensions: dimensions,
            volume: dimensions.width * dimensions.height * dimensions.depth,
            weight: estimateWeight(product, productCategory, dimensions),
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