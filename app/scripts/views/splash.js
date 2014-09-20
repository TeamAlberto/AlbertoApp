/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/cart'
], function ($, _, Backbone, JST, CartView) {
    'use strict';

    var SplashView = Backbone.View.extend({
        template: JST['app/scripts/templates/splash.ejs'],

        tagName: 'div',

        id: 'splash',

        className: 'screen',

        events: {
            'click .btn.consumer': 'renderConsumer',
            'click .btn.courier': 'renderCourier'
        },

        initialize: function () {
            this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        renderConsumer: function () {
            console.log('cart');
            this.$el.replaceWith((new CartView()).render().el);
        },

        renderCourier: function () {
            console.log('courier');
            this.$el.replaceWith((new CartView()).render().el);
        }
    });

    return SplashView;
});
