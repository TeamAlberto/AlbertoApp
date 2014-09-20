/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app',
    'views/cart-item',
], function ($, _, Backbone, JST, app, CartItemView) {
    'use strict';

    var ShoppingbasketView = Backbone.View.extend({
        template: JST['app/scripts/templates/shoppingbasket.ejs'],

        tagName: 'div',

        id: 'shoppingbasket',

        className: 'screen',

        events: {
          'click .previous': 'previous',
          'click .next': 'next'
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.render);
        },

        previous: function () {
          app.vent.trigger('addgroceries:show', this.collection);
        },

        next: function () {
          app.vent.trigger('geo:show');
        },

        transportCost: function () {
            var level = this.transportLevel();
            if (level > 0 && level <= 20) {
                return 5;
            } else if (level <= 60) {
                return 7.5;
            } else {
                return 10;
            }
        },

        transportType: function () {
            var level = this.transportLevel();
            if (level > 0 && level <= 20) {
                return 'race';
            } else if (level <= 60) {
                return 'transport';
            } else {
                return 'bakfiets';
            }
        },

        transportLevel: function () {
          return this.collection.reduce(function(total, item){
              console.log(item.toJSON());
              return total + (item.get('volume') * item.get('basketQuantity'));
          }, 0) / 100547664 * 100;
        },

        renderCosts: function () {
            this.$('.progress-bar').css('width', (this.transportLevel()) + "%");
            this.$('.transportprice').text(this.transportCost());
            this.$('.groceryprice').text(this.groceryCost());
            this.$('.totalprice').text(this.groceryCost() + this.transportCost());
        },

        groceryCost: function () {
            return this.collection.reduce(function(total, item){
                return total + (item.get('price') * item.get('basketQuantity'));
            }, 0);
        },

        renderItems: function () {
            var $items = this.$('.items').empty();
            this.collection.each(function (item) {
                var view = new CartItemView({model: item, collection: this.collection});
                $items.append(view.render().el);
            }.bind(this));
        },

        render: function () {
            this.$el.html(this.template());
            this.$('.bike-type').text(this.transportType());
            this.renderCosts();
            this.renderItems();
            return this;
        }
    });

    return ShoppingbasketView;
});
