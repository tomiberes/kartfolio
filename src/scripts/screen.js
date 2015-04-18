'use strict';

var QUERY = {
  phone: '(min-device-width: 320px) and (max-device-width: 480px)',
  tablet: '(min-device-width : 768px) and (max-device-width : 1024px)',
  desktop: '(min-width : 1224px)',
  large: '(min-width : 1824px)'
};

var SCREEN = {
  phone: 1,
  tablet: 2,
  desktop: 3,
  large: 4
};

var Screen = module.exports = {
  type: 0,

  mediaQuery: function() {
    // Cache query should be done only once per application startup
    if (Screen.type !== 0) return Screen.type;
    if (matchMedia(QUERY.phone).matches) {
      Screen.type = SCREEN.phone;
      return Screen.type;
    }
    if (matchMedia(QUERY.tablet).matches) {
      Screen.type = SCREEN.tablet;
      return Screen.type;
    }
    if (matchMedia(QUERY.desktop).matches) {
      Screen.type = SCREEN.desktop;
      return Screen.type;
    }
    if (matchMedia(QUERY.large).matches) {
      Screen.type = SCREEN.large;
      return Screen.type;
    }
    // No queries were matched
    return false;
  },

  setType: function(t) {
    Screen.type = t;
    return Screen.type;
  }

};
