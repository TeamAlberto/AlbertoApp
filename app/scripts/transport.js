/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var TransportView = Backbone.View.extend({

    	canvas: null,
    	context: null,
    	level: 0,
    	targetLevel: 0,
    	images: [],

        initialize: function (options) {
        	this.canvas = options.canvas;
        	this.context = this.canvas.getContext("2d");
        	
        	var imagePaths = ["race", "transport", "bakfiets"];
        	for (var i = 0; i < imagePaths.length; i++) {
        		var img = new Image();
        		img.src = "/images/" + imagePaths[i] + ".png";
        		this.images.push(img);
        	}

        	this.render();
        },

        update: function(level) {
        	this.targetLevel = level;
        	return this;
        },

        render: function () {
        	requestAnimationFrame(this.render.bind(this));

        	this.level += (this.targetLevel - this.level) * 0.3;

        	this.canvas.width = this.canvas.width;

        	var progress = Math.min(this.level / 100, 1);

        	var pixelRatio = window.devicePixelRatio;
        	var w = this.canvas.width / pixelRatio;
        	var h = this.canvas.height / pixelRatio;

        	var ctx = this.context;
        	ctx.scale(pixelRatio, pixelRatio);

        	// top bar
        	ctx.fillStyle = "#F7F7F7";
        	ctx.fillRect(0, 0, w, 37);

        	// progress bar bg
        	ctx.fillStyle = "#CCCCCC";
        	ctx.fillRect(0, 37, w, 3);

        	// separators
        	ctx.fillStyle = "#DEDEDE";
        	var third = Math.round(w / 3);
        	ctx.fillRect(third, 0, 1, 37);
        	ctx.fillRect(third * 2, 0, 1, 37);

        	// images
        	ctx.save();
        	ctx.scale(0.5, 0.5);
        	for (var i = 0; i < 3; i++) {
        		var active = (progress >= i * 0.33 && progress <= (i + 1) * 0.33);
        		ctx.globalAlpha = active ? 1 : 0.25;
        		if (active) {
        			ctx.fillStyle = "#FFF";
        			ctx.fillRect(i * third * 2 + 1, 0, third * 2 - 1, 37 * 2);
        		}
	        	ctx.drawImage(this.images[i], third * (1 + i * 2) - this.images[i].width * 0.5, 37 - this.images[i].height * 0.5);
	        }
        	ctx.restore();

        	// main bar
        	ctx.fillStyle = "#00A0E2";
        	ctx.fillRect(0, 36, w * progress, 8);
        	
        	// arrow
        	var arrowSize = 6;
        	ctx.beginPath();
        	ctx.moveTo(w * progress - arrowSize, 36);
        	ctx.lineTo(w * progress, 36 - arrowSize);
        	ctx.lineTo(w * progress + arrowSize, 36);
        	ctx.lineTo(w * progress + arrowSize, 36 + 8);
        	ctx.lineTo(w * progress, 36 + 8);
        	ctx.fill();
        }
    });

    return TransportView;
});
