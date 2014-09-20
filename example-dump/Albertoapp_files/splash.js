/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'app'
], function ($, _, Backbone, JST, app) {
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
            app.vent.trigger('addgroceries:show');
        },

        renderCourier: function () {
            app.vent.trigger('courier:show');
        }
    });

    return SplashView;
});
