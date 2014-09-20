/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app'
], function ($, _, Backbone, JST, app) {
    'use strict';

    var DeliveryView = Backbone.View.extend({
        template: JST['app/scripts/templates/delivery.ejs'],

        tagName: 'div',

        id: '',

        className: '',

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
          app.vent.trigger('trackcourier:show');
        },

        next: function () {
          app.vent.trigger('splash:show');
        },
    });

    return DeliveryView;
});
