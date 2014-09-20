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

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .btn.add-cart': 'addToCart'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        addToCart: function () {
            var existing = this.collection.get(this.model.id);
            if (existing) {
                this.model.set({quantity: (this.model.get('quantity') || 1) + 1})
            } else {
                this.model.set('quantity', 1);
                this.collection.add(this.model);
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return CartView;
});
