'use strict';

// Slides mixin for View
var Slides = module.exports = {

  setSlides: function(opts) {
    opts = opts || {};
    this.$slidesWrap = this.$el.find('.slides-wrap');
    this.$slides = this.$el.find('.slide');
    this.$prev = this.$el.find('.slides-prev');
    this.$next = this.$el.find('.slides-next');
    this.total = this.$slides.length;
    this.index = 0;
    this.loop = false;
    this.auto = false;
    this.autoDuration = 3000;
    this._slidesIntervalID = null;
    if (opts.loop) this.loop = opts.loop;
    if (opts.auto) this.auto = opts.auto;
    if (opts.autoDuration) this.autoDuration = opts.autoDuration;
    // Disable initial prev if not in a loop
    if (!this.loop) this.slidesDisableNav(this.$prev);
    if (this.auto) this.slidesAuto();
    // Attach listeners for available actions
    this.slideActions();
    // Workaroud so there will be slide animation from first slide
    // TODO haven't figured out the exact source of the issue
    this.slideTo(this.index);
  },

  slideTo: function(index) {
    var $currSlide = this.$slides.eq(index);
    this.$slidesWrap.css({ 'left': (- $currSlide.position().left) });
    if (this._slidesIntervalID) this.slidesAuto();
  },

  slideActions: function() {
    var self = this;
    self.$next.on('click', function() {
      self.index++;
      if (self.loop) {
        if (self.index === self.total) {
          self.index = 0;
        }
      } else {
        self.slidesEnableNav(self.$prev);
        if (self.index === self.total - 1) {
          self.index = self.total - 1;
          self.slidesDisableNav(self.$next);
        }
      }
      self.slideTo(self.index);
    });
    self.$prev.on('click', function() {
      self.index--;
      if (self.loop) {
        if (self.index === -1) {
          self.index = self.total - 1;
        }
      } else {
        self.slidesEnableNav(self.$next);
        if (self.index === 0) {
          self.index = 0;
          self.slidesDisableNav(self.$prev);
        }
      }
      self.slideTo(self.index);
    });
  },

  slidesAuto: function() {
    var self = this;
    // Only works when in loop
    if (!self.loop) return;
    if (self._slidesIntervalID) clearInterval(self._slidesIntervalID);
    self._slidesIntervalID = setInterval(function() {
      self.$next.trigger('click');
    }, self.autoDuration);
  },

  // Default actions for enable/disable navigation controls

  slidesEnableNav: function($el) {
    $el.show();
  },

  slidesDisableNav: function($el) {
    $el.hide();
  },

  slidesOnClose: function() {
    this.$next.off('click');
    this.$prev.off('click');
  },

};
