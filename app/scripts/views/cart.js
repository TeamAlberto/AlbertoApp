/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CartView = Backbone.View.extend({
        template: JST['app/scripts/templates/cart.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'keyup [name=search]': 'search',
            'keydown [name=search]': 'search',
            'change [name=search]': 'search',
        },

        initialize: function () {
            this.cartItems = new Backbone.Collection();
            this.searchItems = new Backbone.Collection();
            this.fetchSearchItems = _.debounce(function () {
                this.searchItems.fetch();
            }.bind(this), 300);
            this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        search: function (e) {
            this.searchItems.url = 'http://localhost:3000/search?q='+ e.target.value;
            this.fetchSearchItems();
        },

    });

    return CartView;
});
