// Landing has specific behaviour = specific script
'use strict';

var $ = require('jquery'),
    View = require('./view'),
    Slides = require('./slides');

var Landing = module.exports = function() {
  View.apply(this, arguments);
};

$.extend(Landing.prototype, View.prototype, Slides, {

  init: function() {
    // Got to know the values for setSizes
    this.$frame = $('#frame');
    this.$menu = $('#menu');
    this.setSlides({
      loop: true,
      // auto: true,
      // autoDruration: 8000
    });
    this.onResize();
    this.setSizes();
  },

  inserted: function() {
    // this.setSizes();
  },

  slidesEnableNav: function() {
    return;
  },

  slidesDisableNav: function() {
    return;
  },

  setSizes: function() {
    var framing = parseInt(this.$frame.css('margin-top').slice(0, -2)) * 2;
    this.$el.width(this.$frame.width());
    this.$el.height(this.$frame.height() - this.$menu.height());
    this.$el.find('.slide').width(this.$el.width());
  },

  onResize: function() {
    var self = this;
    $(window).on('resize',function() {
      setTimeout(function() {
        self.setSizes();
      }, 100);
    });
  },

  onClose: function() {
    this.slidesOnClose();
    // $(window).off(this.onResize); // TODO exact handler
  },

});
