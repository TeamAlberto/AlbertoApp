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
          'click .previous': 'previous',
          'click .next': 'next'
        },

        initialize: function () {
        	this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
        },

        previous: function () {
          app.vent.trigger('addgroceries:show');
        },

        next: function () {
          app.vent.trigger('geo:show');
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return ShoppingbasketView;
});
