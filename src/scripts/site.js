'use strict';

var $ = require('jquery'),
    Blazy = require('blazy'),
    View = require('./view'),
    animDuration = 500;

var Site = module.exports = function(opts) {
  View.apply(this, arguments);
};

$.extend(Site.prototype, View.prototype, {

  init: function(opts) {
    this.$body = $('body');
    this.$body.append(this.$el);
    this.$frame = this.$el.find('#frame');
    this.$menuFrame = this.$el.find('#menu-frame');
    this.$contentFrame = this.$el.find('#content-frame');
    // `#frame` is the scrollable container
    // b-lazy revalidates on container and window `scroll` events
    this.blazy = new Blazy({ container: '#frame' });
    this.menu = null;
    this.content = null;
    this.setSizes();
    this.onResize();
    this.setMenu();
  },

  setMenu: function() {
    if (this.menu) this.menu.close();
    var Menu = require('./views').menu,
        template = require('./templates').menu,
        view = new Menu({ template: template });
    this.menu = view;
    this.$menuFrame.append(view.$el);
    this.menu.inserted();
  },

  setContent: function(view) {
    if (this.content) {
      this.blazy.destroy();
      this.content.close();
    }
    this.content = view;
    this.$contentFrame.append(this.content.$el);
    this.$contentFrame.show();
    this.content.inserted();
    this.blazy.revalidate();
  },

  setContentAnim: function(view) {
    var self = this;
    function insertView(view) {
      self.content = view;
      self.$contentFrame.append(self.content.$el);
      self.$contentFrame.fadeIn(animDuration, function() {
        self.content.inserted();
        self.blazy.revalidate();
      });
    }
    if (self.content) {
      self.$contentFrame.fadeOut(animDuration, function() {
        self.blazy.destroy();
        self.content.close();
        insertView(view);
      });
    } else {
      insertView(view);
    }
  },

  setSizes: function() {
    // Shorthand properties like `margin` are not supported by jquery
    var framing = parseInt(this.$frame.css('margin-top').slice(0, -2)) * 2;
    this.$frame.width(this.$el.width() - framing);
    this.$frame.height(this.$el.height() - framing);
  },

  onResize: function() {
    var self = this;
    $(window).on('resize',function() {
      setTimeout(function() {
        self.setSizes();
      }, 100);
    });
  },

});
