/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'async!http://maps.google.com/maps/api/js?key=AIzaSyBu2IneG_H3n2sOBw56oXFT1k4wU6xi4uk&sensor=true!callback',
    'app'
], function ($, _, Backbone, JST, _goog, app) {
    'use strict';

    var TrackcourierView = Backbone.View.extend({
        template: JST['app/scripts/templates/trackcourier.ejs'],

        tagName: 'div',

        id: 'trackcourier',

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
            setTimeout(function () {
                this.loadMap(this.$(".map").get(0));
            }.bind(this), 300);
            return this;
        },

        previous: function () {
          app.vent.trigger('findcourier:show');
        },

        next: function () {
          app.vent.trigger('delivery:show');
        },

        loadMap: function( mapCanvas ) {

        	var courierLocation  = new google.maps.LatLng(52.3764753,4.9255093);
        	var consumerLocation = new google.maps.LatLng(52.3778803,4.9163712,17);
        	var ahLocation		 = new google.maps.LatLng(52.3739849,4.9388506);

			var myOptions = {
				center: courierLocation,
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map( mapCanvas, myOptions );

			var marker = new google.maps.Marker({
			    position: consumerLocation,
			    map: map,
			    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
			    title:"I'm here!"
			});

			var marker = new google.maps.Marker({
			    position: courierLocation,
			    map: map,
			    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			    title:"AH"
			});

			var marker = new google.maps.Marker({
			    position: ahLocation,
			    map: map,
			    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			    title:"Courier"
			});
		}
    });

    return TrackcourierView;
});
