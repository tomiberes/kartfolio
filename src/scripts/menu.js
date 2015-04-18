'use strict';

var $ = require('jquery'),
    View = require('./view');

var Menu = module.exports = function() {
  View.apply(this, arguments);
  this.$selectedLink = null;
};

$.extend(Menu.prototype, View.prototype, {

  inserted: function() {
    this.onLinkSelected();
    this.underlineLink();
  },

  underlineLink: function() {
    var section = '#link-' + window.location.hash.replace('#/', '')
      .split('/')[0];
    var $link = $(section);
    if (this.$selectedLink) this.$selectedLink.removeClass('link-selected');
    if ($link.attr('id') === 'link-landing') return;
    this.$selectedLink = $link;
    this.$selectedLink.addClass('link-selected');
  },

  onLinkSelected: function() {
    var self = this;
    // `hashchange` is not a native jQuery  event
    window.addEventListener('hashchange', function(el) {
      self.underlineLink();
    });
  }

});
