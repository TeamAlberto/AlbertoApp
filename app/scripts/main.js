/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash.compat',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        async: '../bower_components/requirejs-plugins/src/async'
    }
});

require([
    'backbone',
    'views/splash',
    'views/shoppingbasket',
    'views/addgroceries',
    'views/geolocation',
    'views/payment',
    'views/findcourier',
    'views/trackcourier',
    'views/delivery',
], function (Backbone, SplashView, ShoppingbasketView, AddgroceriesView, GeolocationView, PaymentView, FindcourierView, TrackcourierView, DeliveryView) {
    Backbone.history.start();
   	var view = new TrackcourierView();
    $('body').html(view.render().el);
    view.loadMap($("#map").get(0));
});
