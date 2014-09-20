/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app'
], function ($, _, Backbone, JST, app) {
    'use strict';

    var PaymentView = Backbone.View.extend({
        template: JST['app/scripts/templates/payment.ejs'],

        tagName: 'div',

        id: 'payment',

        className: 'screen',

        events: {
          'click .previous': 'previous',
          'click .next': 'next'
        },

        initialize: function () {
        	this.model = new Backbone.Model();
          this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        previous: function () {
          app.vent.trigger('geo:show');
        },

        next: function () {
          app.vent.trigger('findcourier:show');
        }
    });

    return PaymentView;
});
