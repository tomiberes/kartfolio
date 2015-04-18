'use strict';

var $ = require('jquery'),
    Blazy = require('blazy'),
    View = require('./view'),
    Tiles = require('./tiles');

var Graphicd = module.exports = function() {
  View.apply(this, arguments);
};

$.extend(Graphicd.prototype, View.prototype, Tiles, {

  inserted: function() {
    this.setTiles(this.$el);
  },

});
