'use strict';

//
var $ = require('jquery'),
    View = require('./view');
    var routes = require('./routes');

var Project = module.exports = function() {
  View.apply(this, arguments);
};

$.extend(Project.prototype, View.prototype, {

  inserted: function() {
    this.$x = this.$el.find('.ui-btn-x');
    this.$x.on('click', function() {
      routes.back();
    });
  },

  onClose: function() {
    this.$x.off('click');
  },

});
