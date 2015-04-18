'use strict';

var $ = require('jquery');

// Base view
var View = module.exports = function(opts) {
  opts = opts || {};
  if (opts.template) {
    this.template = opts.template;
    this.$el = $(this.template);
  }
  this.init(opts);
};

$.extend(View.prototype, {

  template: null,

  $el: null,

  // noop
  init: function(opts) {
    return;
  },

  // Convention for operations which can be done,
  // only after element is inserted into the DOM
  // noop by default
  inserted: function() {
    return;
  },

  close: function(opts) {
    this.onClose();
    this.$el.remove();
  },

  // Custom close operations, noop by default
  onClose: function() {
    return;
  },

});
