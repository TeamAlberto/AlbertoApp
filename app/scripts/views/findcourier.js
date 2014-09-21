/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app'
], function ($, _, Backbone, JST, app) {
    'use strict';

    var FindcourierView = Backbone.View.extend({
        template: JST['app/scripts/templates/findcourier.ejs'],

        tagName: 'div',

        id: 'findcourier',

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
            var i = 1;
            var interval = setInterval(function () {
                var string = '';
                _(i).times(function() { string += '.'; });
                if (i === 3) {
                    i = 1;
                } else {
                    i++;
                }
                this.$('.progress').text(string);
            }.bind(this), 300);
            setTimeout(function () {
                clearInterval(interval);
                this.next();
            }.bind(this), 10000);
            
            var phproot = "http://jw.anttikupila.com/";
            var ordertext  = "";
            var items = new Array();
           	for(var i in this.collection.models) {
           		var item = this.collection.models[i].attributes;  
           		items.push(item.basketQuantity+"* "+item.name);    		
           	}
           	ordertext+= items.join("\n");
           	ordertext+= "\nE"+this.collection.totalCost();
           	this.$("#order").val(ordertext);
            $.post(phproot + "order.php", this.$("#orderForm").serialize(), function(res) {
            	console.log(res);
            })
            return this;
        },

        previous: function () {
          app.vent.trigger('geo:show', this.collection);
        },

        next: function () {
          app.vent.trigger('trackcourier:show');
        }
    });

    return FindcourierView;
});
