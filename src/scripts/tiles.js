'use strict';

var $ = require('jquery'),
    Screen = require('./screen');

// Tiles mixin for View
var Tiles = module.exports = {

  setTiles: function($parent) {
    var tiles = $parent.find('.tile'),
        availWidth = $parent.innerWidth(),
        btnWidth;
    if (Screen.type === 0) Screen.mediaQuery();
    switch (Screen.type) {
      case 1:
        btnWidth = availWidth;
        break;
      case 2:
        btnWidth = availWidth / 2;
        break;
      case 3:
      case 4:
        btnWidth = availWidth / 3;
        break;
      default:
        // Default instead of `0`, undefined screen size
        btnWidth = availWidth / 3;
        break;
    }
    tiles.each(function(i, el) {
      var $el = $(el);
      $el.css({
        'width': btnWidth,
      });
    });
  },

};
