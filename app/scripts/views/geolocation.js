/*global define*/

define(
	[ ],
	function() {
		return {
				
		}
	}
);

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    //"async!http://maps.google.com/maps/api/js?key=AIzaSyBu2IneG_H3n2sOBw56oXFT1k4wU6xi4uk&sensor=true!callback" 
], function ($, _, Backbone, JST) {
    'use strict';

    var GeolocationView = Backbone.View.extend({
        template: JST['app/scripts/templates/geolocation.ejs'],

        tagName: 'div',

        id: 'geolocation',

        className: 'screen',

        events: {},

        initialize: function () {
        	this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        /*
        loadMap: function( mapCanvas ) {
			var myOptions = {
				center: new google.maps.LatLng( -34.397, 150.644 ),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
	
			var map = new google.maps.Map( mapCanvas, myOptions );			
		}*/	
    });

    return GeolocationView;
});
