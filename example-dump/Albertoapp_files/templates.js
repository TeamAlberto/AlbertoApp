define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/addgroceries.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form class="form-inline" role="form">\n\t<input type="text"  class="form-control pull-left" value="" name="productname" placeholder="Search">\n\t<ul class="list-group items">\n  \t\t<li class="list-group-item">\n  \t\t\t<span><b>Bie</b>r</span>\n  \t\t</li>\n  \t\t<li class="list-group-item">\n  \t\t\t<span><b>Bie</b>tjes</span>\n  \t\t</li>\n  \t</ul>\n  \t<div class="align-bottom">\n  \t\t<div class="row">\n  \t\t\t<div class="col-md-4">\n\t  \t\t\t<label>Price €</label>\n\t  \t\t</div>\n\t  \t\t<div class="col-md-8">\n\t  \t\t\t€<span class=price>0,00</span>\n\t  \t\t</div>\n\t  \t</div>\n\t\t<div class="btn-group">\n\t\t\t<button type="button" class="btn btn-default cart"><a>Get me my groceries!<a/></button>\n\t\t\t<button type="button" class="btn btn-default splash"><a>Go back</a></button>\n\t\t</div>\n\t</div>\n</form>\n';

}
return __p
};

this["JST"]["app/scripts/templates/cart-item.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h1>' +
((__t = ( name )) == null ? '' : __t) +
'</h1>\n<p>' +
((__t = ( price )) == null ? '' : __t) +
'</p>\n<img src="' +
((__t = ( image )) == null ? '' : __t) +
'" style="max-height: 50px" />\n<p>\n  <button class="btn add-cart">+</button>\n  ';
 if (typeof quantity !== "undefined") { ;
__p += '\n    (' +
((__t = ( quantity )) == null ? '' : __t) +
')\n  ';
 } ;
__p += '\n</p>\n';

}
return __p
};

this["JST"]["app/scripts/templates/cart.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type="text" name="search" value="">\n<div class=items>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/delivery.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/findcourier.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Finding your courier...</p>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/geolocation.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="map">\n</div>\n<form role="form">\n\t<div class="row">\n\t\t<div class="col-md-4">\n  \t\t\t<span class="pull-left">City</span>\n  \t\t</div>\n  \t\t<div class="col-md-8">\n  \t\t\t<input type="text"  class="form-control" value="Amsterdam" name="city">\n  \t\t</div>\n  \t</div>\n\t<div class="row">\n\t\t<div class="col-md-4">\n  \t\t\t<span class="pull-left">Address</span>\n  \t\t</div>\n  \t\t<div class="col-md-8">\n  \t\t\t<input type="text"  class="form-control" value="Pietheinkade 55" name="address">\n  \t\t</div>\n  \t</div>\n  \t<div class="row">\n\t\t<div class="col-md-4">\n  \t\t\t<span class="pull-left">Details</span>\n  \t\t</div>\n  \t\t<div class="col-md-8">\n  \t\t\t<input type="text"  class="form-control" value="UP building, 18th floor" name="details">\n  \t\t</div>\n  \t</div>\n  \t<div class="row">\n\t\t<div class="col-md-8">\n  \t\t\t<label class="pull-left">Total</label>\n  \t\t</div>\n  \t\t<div class="col-md-2">\n  \t\t\t<label class="pull-right">€0,00</label>\n  \t\t</div>\n  \t</div>\n  \t<div class="align-bottom">\n\t  \t<div class="btn-group">\n\t\t\t<button type="button" class="btn btn-default consumer"><a>Go back<a/></button>\n\t\t\t<button type="button" class="btn btn-default courier"><a>Go to payment</a></button>\t\n\t\t</div>\n\t</div>\n\n</form>';

}
return __p
};

this["JST"]["app/scripts/templates/payment.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="align-bottom">\n\t  \t<div class="btn-group">\n\t\t\t<button type="button" class="btn btn-default consumer"><a>Go back<a/></button>\n\t\t\t<button type="button" class="btn btn-default courier"><a>Pay</a></button>\t\n\t\t</div>\n\t</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/shoppingbasket.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="list-group">\n  <li class="list-group-item">\n  \t<span class="name">Bier</span>\n  \t<button class="btn pull-right"><span class="glyphicon glyphicon-remove"></span></button>\n  \t<span class="price pull-right">€0,00</span>\n  \t<input type="text" style="width:35px" class="amount form-control pull-right" value="1">\n  </li>\n  <li class="list-group-item">\n   \t<span class="name">Bier</span>\n  \t<button class="btn pull-right"><span class="glyphicon glyphicon-remove"></span></button>\n  \t<span class="price pull-right">€0,00</span>\n  \t<input type="text" style="width:35px" class="amount form-control pull-right" value="1">\n  </li>\n  <li class="list-group-item">\n  \t<span class="name">Bier</span>\n  \t<button class="btn pull-right"><span class="glyphicon glyphicon-remove"></span></button>\n  \t<span class="price pull-right">€0,00</span>\n  \t<input type="text" style="width:35px" class="amount form-control pull-right" value="1">\n  </li>\n  <li class="list-group-item">\n  \t<button class="btn btn-block">\n  \t\t<span class="pull-left glyphicon glyphicon-plus-sign"></span><span>Add item</span>\n  \t</button>\n  </li>\n</ul>\n<div class="align-bottom">\n\t<div class="row">\n\t\t<div class="col-md-4">\n  \t\t\t<label>race</label>\n  \t\t</div>\n  \t\t<div class="col-md-4">\n  \t\t\t<label>transport</label>\n  \t\t</div>\n  \t\t<div class="col-md-4">\n  \t\t\t<label>bakfiets</label>\n  \t\t</div>\n\t</div>\n\t<div class="progress">\n\t  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 20%;">\n\t  </div>\n\t</div>\n\t<div class="row">\n\t\t<div class="col-md-8">\n  \t\t\t<span class="pull-left">Groceries</span>\n  \t\t</div>\n  \t\t<div class="col-md-2">\n  \t\t\t<span class="pull-right">€0,00</span>\n  \t\t</div>\n  \t</div>\n  \t<div class="row">\n\t\t<div class="col-md-8">\n  \t\t\t<span class="pull-left">Transport</span>\n  \t\t</div>\n  \t\t<div class="col-md-2">\n  \t\t\t<span class="pull-right">€0,00</span>\n  \t\t</div>\n  \t</div>\n  \t<div class="row">\n\t\t<div class="col-md-8">\n  \t\t\t<label class="pull-left">Total</label>\n  \t\t</div>\n  \t\t<div class="col-md-2">\n  \t\t\t<label class="pull-right">€0,00</label>\n  \t\t</div>\n  \t</div>\n\t<div class="btn-group">\n\t\t<button type="button" class="btn btn-default consumer"><a>Go back<a/></button>\n\t\t<button type="button" class="btn btn-default pay"><a>Continue</a></button>\n\t</div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/splash.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="align-bottom">\n\t<div class="btn-group">\n\t\t<button type="button" class="btn btn-default consumer"><a>Consumer<a/></button>\n\t\t<button type="button" class="btn btn-default courier"><a>Courier</a></button>\t\n\t</div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/trackcourier.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="map"></div>\n\n';

}
return __p
};

  return this["JST"];

});