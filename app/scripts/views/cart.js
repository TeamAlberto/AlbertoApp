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
            this.searchItems = new Backbone.Collection();
            this.fetchSearchItems = _.debounce(function () {
                this.searchItems.add({
                    name: 'Heineken 12 pack',
                    image: 'http://deerparkpub.com/wp-content/uploads/2014/07/Heineken.jpg',
                    price: 3.5,
                });
                // this.searchItems.fetch();
            }.bind(this), 300);
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
            var $items = this.$('.items').empty();
            this.searchItems.each(function (item) {
                var view = new CartItemView({model: item});
                $items.append(view.render().el);
            });
        },

        search: function (e) {
            this.searchItems.url = 'http://localhost:3000/search?q='+ e.target.value;
            this.fetchSearchItems();
        },

    });

    return CartView;
});
