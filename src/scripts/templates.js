'use strict';

// Browserify issue #824 cannot use concatenated strings,
// thus keeping prefix for reference, and using full static paths
var prefix = '../templates/';
// Require all templates loader, workaround for browserify
module.exports = {
  site: require('../templates/site.html'),
  menu: require('../templates/menu.html'),
  // Landing
  landing: require('../templates/landing.html'),
  //  Graphic design
  graphicd: require('../templates/graphicd.html'),
  graphicd_godo: require('../templates/graphicd_godo.html'),
  graphicd_dawnwave: require('../templates/graphicd_dawnwave.html'),
  graphicd_carto: require('../templates/graphicd_carto.html'),
  graphicd_byensrum: require('../templates/graphicd_byensrum.html'),
  graphicd_aalgreeters: require('../templates/graphicd_aalgreeters.html'),
  graphicd_tegudekalender: require('../templates/graphicd_tegudekalender.html'),
  // Illustrations
  illustrations: require('../templates/illustrations.html'),
  illustrations_aau: require('../templates/illustrations_aau.html'),
  illustrations_sakukalender: require('../templates/illustrations_sakukalender.html'),
  illustrations_klass: require('../templates/illustrations_klass.html'),
  illustrations_sbook: require('../templates/illustrations_sbook.html'),
  illustrations_conceptart: require('../templates/illustrations_conceptart.html'),
  illustrations_whale: require('../templates/illustrations_whale.html'),
  // Bio
  bio: require('../templates/bio.html'),
};
