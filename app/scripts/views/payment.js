/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PaymentView = Backbone.View.extend({
        template: JST['app/scripts/templates/payment.ejs'],

        tagName: 'div',

        id: 'payment',

        className: 'screen',

        events: {},

        initialize: function () {
        	this.model = new Backbone.Model();
            this.listenTo(this.model, 'change', this.render);
            
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return PaymentView;
});
