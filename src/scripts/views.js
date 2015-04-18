'use strict';

// Require all custom views loader, workaround for browserify
module.exports = {
  view: require('./view'),
  site: require('./site'),
  menu: require('./menu'),
  landing: require('./landing'),
  graphicd: require('./graphicd'),
  illustrations: require('./illustrations'),
  project: require('./project'),
};
