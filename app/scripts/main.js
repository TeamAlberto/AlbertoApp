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
        async: '../bower_components/requirejs-plugins/src/async',
        app: './app'
    }
});

require([
    'backbone',
    'app',
    'events',
    // 'views/splash',
    // 'views/shoppingbasket',
    // 'views/addgroceries',
    // 'views/geolocation',
    // 'views/payment',
    // 'views/findcourier',
    // 'views/trackcourier',
    // 'views/delivery',
], function (Backbone, app) {
    console.log('main');
    Backbone.history.start();
    app.vent.trigger('trackcourier:show');
   // 	var view = new SplashView();
    // $('body').html(view.render().el);
    // view.loadMap($("#map").get(0));
});
