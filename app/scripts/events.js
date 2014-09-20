define([
  'app',
  'jquery',
  'views/addgroceries',
  'views/shoppingbasket',
  'views/payment',
  'views/geolocation',
  'views/splash',
  'views/findcourier',
  'views/trackcourier',
  'views/delivery',
], function (app, $, AddGroceriesView, BasketView, PaymentView, GeoView, SplashView, FindcourierView, TrackcourierView, DeliveryView) {
  app.vent.on('splash:show', function (collection) {
    var view = new SplashView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('addgroceries:show', function (collection) {
    var view = new AddGroceriesView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('cart:show', function (collection) {
    console.log('cart:show');
    var view = new BasketView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('geo:show', function (collection) {
    var view = new GeoView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('payment:show', function (collection) {
    var view = new PaymentView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('findcourier:show', function (collection) {
    var view = new FindcourierView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('trackcourier:show', function (collection) {
    var view = new TrackcourierView({collection: collection});
    $('body').html(view.render().el);
  });

  app.vent.on('delivery:show', function (collection) {
    var view = new DeliveryView({collection: collection});
    $('body').html(view.render().el);
  });
});
