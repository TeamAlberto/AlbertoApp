define([
  'app',
  'jquery',
  'views/shoppingbasket',
  'views/payment',
  'views/geolocation',
  'views/splash',
], function (app, $, BasketView, PayentView, GeoView, SplashView) {
  app.vent.on('splash:show', function (collection) {
    var view = new SplashView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('cart:show', function (collection) {
    var view = new BasketView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('payment:show', function (collection) {
    var view = new PaymentView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('geo:show', function (collection) {
    var view = new GeoView({collection: collection});
    $('body').html(view.render().el);
  });
});
