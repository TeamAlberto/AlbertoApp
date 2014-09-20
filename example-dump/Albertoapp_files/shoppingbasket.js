/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app'
], function ($, _, Backbone, JST, app) {
    'use strict';

    var ShoppingbasketView = Backbone.View.extend({
        template: JST['app/scripts/templates/shoppingbasket.ejs'],

        tagName: 'div',

        id: 'shoppingbasket',

        className: 'screen',

        events: {
          'click .consumer': 'toConsumer',
          'click .pay': 'toPay'
        },

        initialize: function () {
        	this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
        },

        toConsumer: function () {
          console.log('go back');
          app.vent.trigger('addgroceries:show');
        },

        toPay: function () {
          app.vent.trigger('payment:show');
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return ShoppingbasketView;
});
