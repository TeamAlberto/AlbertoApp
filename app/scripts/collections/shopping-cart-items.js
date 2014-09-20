/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ShoppingcartitemsCollection = Backbone.Collection.extend({
        groceryPrice: function () {
            return this.reduce(function(total, item){
                return total + (item.get('price') * item.get('basketQuantity'));
            }, 0);
        },
        transportLevel: function () {
          return this.reduce(function(total, item){
              return total + (item.get('volume') * item.get('basketQuantity'));
          }, 0) / 100547664 * 100;
        },
        transportType: function () {
            var level = this.transportLevel();
            if (level > 0 && level <= 20) {
                return 'race';
            } else if (level <= 60) {
                return 'transport';
            } else {
                return 'bakfiets';
            }
        },
        transportCost: function () {
            var level = this.transportLevel();
            if (level >= 0 && level <= 20) {
                return 5;
            } else if (level <= 60) {
                return 7.5;
            } else {
                return 10;
            }
        },
        totalCost: function () {
            return this.transportCost() + this.groceryPrice();
        }
    });

    return ShoppingcartitemsCollection;
});
