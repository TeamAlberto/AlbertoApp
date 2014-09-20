define([
  'backbone',
],
function (Backbone) {
  var app = {};

  app.vent = _.extend({}, Backbone.Events);

  return app;
});
