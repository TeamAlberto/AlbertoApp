/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CartView = Backbone.View.extend({
        template: JST['app/scripts/templates/cart-item.ejs'],

        tagName: 'li',

        id: '',

        className: 'list-group-item',

        events: {
            'click .add-cart': 'addToCart',
            'click .remove-cart': 'removeFromCart',
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        addToCart: function (e) {
            e.preventDefault();
            var existing = this.collection.get(this.model.id);
            if (existing) {
                this.model.set({basketQuantity: (this.model.get('basketQuantity') || 1) + 1})
            } else {
                this.model.set('basketQuantity', 1);
                this.collection.add(this.model);
            }
        },

        removeFromCart: function (e) {
            e.preventDefault();
            var existing = this.collection.get(this.model.id);
            if (existing.get('basketQuantity') > 1) {
                this.model.set({basketQuantity: this.model.get('basketQuantity') - 1})
            } else {
                this.collection.remove(this.model);
                this.model.set({basketQuantity: 0});
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return CartView;
});
