'use strict';

// Avoiding circular dependency
// https://github.com/jorendorff/js-loaders/issues/102
var Router = require('./router'),
    routes = module.exports = new Router();
