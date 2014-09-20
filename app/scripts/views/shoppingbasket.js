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
          app.vent.trigger('geo:show', this.collection);
        },

        renderCosts: function () {
            this.$('.progress-bar').css('width', (this.collection.transportLevel()) + "%");
            this.$('.transportprice').text(this.collection.transportCost());
            this.$('.groceryprice').text(this.collection.groceryPrice());
            this.$('.totalprice').text(this.collection.totalCost());
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
            this.$('.bike-type').text(this.collection.transportType());
            this.renderCosts();
            this.renderItems();
            return this;
        }
    });

    return ShoppingbasketView;
});
