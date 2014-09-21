/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    "async!http://maps.google.com/maps/api/js?key=AIzaSyBu2IneG_H3n2sOBw56oXFT1k4wU6xi4uk&sensor=true!callback" ,
    'app'
], function ($, _, Backbone, JST, _goog, app) {
    'use strict';

    var GeolocationView = Backbone.View.extend({
        template: JST['app/scripts/templates/geolocation.ejs'],

        tagName: 'div',

        id: 'geolocation',

        className: 'screen',

        events: {
          'click .previous': 'previous',
          'click .next': 'next'
        },

        initialize: function () {
            this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('.price').text(this.collection.totalCost());
            setTimeout(function () {
                this.loadMap(this.$(".map").get(0));
            }.bind(this), 300);
            return this;
        },

        previous: function () {
          app.vent.trigger('cart:show', this.collection);
        },

        next: function () {
          app.vent.trigger('findcourier:show', this.collection);
        },

        loadMap: function( mapCanvas ) {

            var consumerLocation = new google.maps.LatLng(52.3778803,4.9163712,17);

            var myOptions = {
                center: consumerLocation,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map( mapCanvas, myOptions );

            var marker = new google.maps.Marker({
                position: consumerLocation,
                map: map,
                title:"I'm here!"
            });
        }
    });

    return GeolocationView;
});
