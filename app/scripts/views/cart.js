/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/cart-item'
], function ($, _, Backbone, JST, CartItemView) {
    'use strict';

    var CartView = Backbone.View.extend({
        template: JST['app/scripts/templates/cart.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'keyup [name=search]': 'search',
            'change [name=search]': 'search',
        },

        initialize: function () {
            this.cartItems = new Backbone.Collection();
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
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.renderItems();
            return this;
        },

        renderItems: function () {
          console.log('rendering items');
            var $items = this.$('.items').empty();
            this.searchItems.each(function (item) {
                var view = new CartItemView({model: item, collection: this.cartItems});
                $items.append(view.render().el);
            }.bind(this));
        },

        search: function (e) {
            this.searchItems.url = 'http://localhost:3000/search/'+ e.target.value;
            this.fetchSearchItems();
        },

    });

    return CartView;
});
