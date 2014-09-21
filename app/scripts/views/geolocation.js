/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    //"async!http://maps.google.com/maps/api/js?key=AIzaSyBu2IneG_H3n2sOBw56oXFT1k4wU6xi4uk&sensor=true!callback" ,
    'app'
], function ($, _, Backbone, JST, app) {
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
          app.vent.trigger('addgroceries:show', this.collection);
        },

        next: function () {
          app.vent.trigger('findcourier:show', this.collection);
        },

        loadMap: function( mapCanvas ) {

			var phproot = "http://jw.anttikupila.com/";
			
            var customerPosition = new google.maps.LatLng(52.3778803,4.9163712);
			
            var myOptions = {
                center: customerPosition,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map( mapCanvas, myOptions );
			
			var infowindow = new google.maps.InfoWindow({
					content: ""
			  	});
			  	
            var customerMarker = new google.maps.Marker({
			    position: customerPosition,
			    map		: map,
			    title	: "you",
			    icon	: phproot + "images/user.png",
			    html	: "<img style='float:left' src='https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.0.50.50/p50x50/10440915_10154240396205191_8041266776110507469_n.jpg?oh=2d548d76e49e2ff6fbd784f9f06a6c89&oe=548FBA59&__gda__=1422610069_91a835c0806b3c623d0ff4e8e78b63e4'><div style='float:left;padding:0px 10px'><b>Your location</b></div>"
			});
			
			google.maps.event.addListener(customerMarker, 'click', function() {
			    infowindow.setContent(this.html);
			    infowindow.open(map,this);
			});
        }
    });

    return GeolocationView;
});
