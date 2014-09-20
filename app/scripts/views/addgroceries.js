/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/cart-item',
    'app',
    'collections/shopping-cart-items'
], function ($, _, Backbone, JST, CartItemView, app, ShoppingCartItemsCollection) {
    'use strict';

    var AddgroceriesView = Backbone.View.extend({
        template: JST['app/scripts/templates/addgroceries.ejs'],

        tagName: 'div',

        id: 'addgroceries',

        className: 'screen',

        events: {
            'keyup .form-control': 'search',
            'change .form-control': 'search',
            'click .cart': 'toCart',
            'click .splash': 'toSplash',
        },

        initialize: function () {
            this.cartItems = this.collection || new ShoppingCartItemsCollection();
            var ItemsCollection = Backbone.Collection.extend({
                parse: function(response) {
                    return response.products;
                }
            });
            this.searchItems = new ItemsCollection();
            this.fetchSearchItems = _.debounce(function () {
                this.searchItems.fetch();
            }.bind(this), 300);
            window.x = this;
            this.model = new Backbone.Model({collection: this.searchItems});
            this.listenTo(this.searchItems, 'reset', this.renderItems);
            this.listenTo(this.searchItems, 'add', this.renderItems);
            this.listenTo(this.searchItems, 'remove', this.renderItems);
            this.listenTo(this.cartItems, 'all', this.renderTotal);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.renderItems();
            this.renderTotal();
            return this;
        },

        renderItems: function () {
            var $items = this.$('.items').empty();
            this.searchItems.each(function (item) {
                var view = new CartItemView({model: item, collection: this.cartItems});
                $items.append(view.render().el);
            }.bind(this));
            if (!this.searchItems.length) {
                $items.text('Start searching for items above...');
            }
        },

        renderTotal: function () {
            this.$('.price').text(this.cartItems.groceryPrice());
        },

        toCart: function () {
            app.vent.trigger('cart:show', this.cartItems);
        },

        toSplash: function () {
            app.vent.trigger('splash:show');
        },

        search: function (e) {
            this.searchItems.url = 'http://localhost:3000/search/'+ e.target.value;
            // this.searchItems.url = '/mock/bier.json';
            this.fetchSearchItems();
        },
    });

    return AddgroceriesView;
});
