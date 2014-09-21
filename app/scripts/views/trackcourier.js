/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    //'async!http://maps.google.com/maps/api/js?libraries=geometry&key=AIzaSyBu2IneG_H3n2sOBw56oXFT1k4wU6xi4uk&sensor=true!callback',
    'app'
], function ($, _, Backbone, JST, app) {
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

            $("#data").slideUp(0);
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

	      	var phproot = "http://jw.anttikupila.com/";
      	
	      	$.get(phproot + "getNearestCouriers.php", $("#consumerLocation").serialize(), function(couriers) {
	      		var bounds = new google.maps.LatLngBounds();
	      		var map = new google.maps.Map(document.getElementById('map'), {disableDefaultUI: true});
	      		
	      		var infowindow = new google.maps.InfoWindow({
					content: ""
			  	});
			  				  	
	      		var destLat = parseFloat($("#consumer-lat").val());
	      		var destLng = parseFloat($("#consumer-lng").val());
	      		
	      		var destination = destLat+","+destLng;
	      		var origin;
	      		
	      		var customerPosition = new google.maps.LatLng(destLat, destLng); 
	      		var customerMarker = new google.maps.Marker({
				    position: customerPosition,
				    map		: map,
				    title	: "you",
				    icon	: phproot + "images/user.png",
				    html	: "<img style='float:left' src='https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.0.50.50/p50x50/10440915_10154240396205191_8041266776110507469_n.jpg?oh=2d548d76e49e2ff6fbd784f9f06a6c89&oe=548FBA59&__gda__=1422610069_91a835c0806b3c623d0ff4e8e78b63e4'><div style='float:left;padding:0px 10px'><b>Your location</b></div>"
				});	
				bounds.extend( customerMarker.getPosition() );
	
				var ahPosition = new google.maps.LatLng(52.378545, 4.8844231); 
	      		var ahMarker = new google.maps.Marker({
				    position: ahPosition,
				    map		: map,
				    title	: "ah",
				    icon	: phproot + "images/store.png",
				    html	: "Best matching AH"
				});
				bounds.extend( ahMarker.getPosition() );		
						  		
				google.maps.event.addListener(customerMarker, 'click', function() {
				    infowindow.setContent(this.html);
				    infowindow.open(map,this);
				});
				google.maps.event.addListener(ahMarker, 'click', function() {
				    infowindow.setContent(this.html);
				    infowindow.open(map,this);
				});
					
	      		for(var index in couriers) {
	      			var courier  = couriers[index];
	      			var courierPosition = new google.maps.LatLng(courier.lat, courier.lng);
	      			
	      			var iconfile;
	      			
	      			if(courier.fastest) {
	      				iconfile = "bike.png";
	      				origin = courier.lat+","+courier.lng;

	      				// set courier info in view too
	      				console.log(courier);
	      				$("#profile").attr("src", courier.details.image);
	      				$("#name").text(courier.details.name);
	      				$(".person").css("display", "table-row");

	      				$("#data").slideDown();
	      			}
	      			else 
	      				iconfile = "bike-blue.png";
	      						
	      			var courierMarker = new google.maps.Marker({
					    position: courierPosition,
					    map		: map,
					    title	: "courier",
					    icon	: phproot + "images/" + iconfile,
					    html	: "<img style='float:left' src='"+courier.details.image+"'><div style='float:left;padding:0px 10px'><b>"+courier.details.name+"</b><br>"+courier.details.equipment+"<br>rating:"+courier.details.rating+"</div>"
					});	
				  		
					google.maps.event.addListener(courierMarker, 'click', function() {
					    infowindow.setContent(this.html);
					    infowindow.open(map,this);
					});
	  				if(courier.fastest) {
						bounds.extend( courierMarker.getPosition() );
					}
	      		}
	      		
	      		map.fitBounds( bounds );
	      		
	      		$.get(phproot + "directions.php?origin="+origin+"&destination="+destination+"&mode=bicycling&key=AIzaSyBu2IneG_H3n2sOBw56oXFT1k4wU6xi4uk", function(response) {
	      			var path = google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline.points)
	      			var line = new google.maps.Polyline({
				      path: path,
				      strokeColor: '#ff00ff',
				      strokeOpacity: 0.7,
				      strokeWeight: 6
				  	});
				
				  	line.setMap(map);
	
					$("#distance").html(response.routes[0].legs[0].distance.text);
					$("#duration").html(response.routes[0].legs[0].duration.text);
				
	      		}, "json");
	
	      	}, "json");     
		}
    });

    return TrackcourierView;
});
