/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app'
], function ($, _, Backbone, JST, app) {
    'use strict';

    var FindcourierView = Backbone.View.extend({
        template: JST['app/scripts/templates/findcourier.ejs'],

        tagName: 'div',

        id: 'findcourier',

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
          app.vent.trigger('payment:show');
        },

        next: function () {
          app.vent.trigger('trackcourier:show');
        }
    });

    return FindcourierView;
});
