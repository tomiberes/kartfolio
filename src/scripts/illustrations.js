'use strict';

var $ = require('jquery'),
    Blazy = require('blazy'),
    View = require('./view'),
    Tiles = require('./tiles');

var Illustrations = module.exports = function() {
  View.apply(this, arguments);
};

$.extend(Illustrations.prototype, View.prototype, Tiles, {

  inserted: function() {
    this.setTiles(this.$el);
  }

});
