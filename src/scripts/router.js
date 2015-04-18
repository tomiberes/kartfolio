'use strict';

var pathToRegexp = require('path-to-regexp');

// Tiny on purpose router

// Might have to use push state cos of default anchor jump behavior with `onhashchange`
var Router = module.exports = function(opts) {
  opts = opts || {};
  var self = this;
  this.routes = {};
  this.default = '*'; // Or 404
  this.history = []; // TODO internal history track
  this.prefix = opts.prefix || '#/';
  window.onhashchange = function (ev) {
    ev.preventDefault();
    self.match();
  };
  window.onload = function (ev) {
    ev.preventDefault();
    self.match();
  };
};

// Match the current location with defined routes and invoke handler
Router.prototype.match = function() {
  var fragment = window.location.hash.replace(this.prefix, ''),
      matched = false,
      exact = false,
      args = [],
      match,
      route;
  for (var path in this.routes) {
    match = this.routes[path].re.exec(decodeURIComponent(fragment));
    if (match) {
      route = this.routes[path];
      for (var i = 1; i < match.length; i++) {
        args.push(match[i]);
      }
      matched = {
        path: fragment,
        args: args
      };
      // Exact match
      if (path === fragment) exact = matched;
    }
  }
  if (exact) matched = exact;
  if (!matched && this.routes.hasOwnProperty(this.default)) {
    route = this.routes[this.default];
    matched = { path: this.default, args: [fragment] };
  }
  return route.handler(matched);
};

// Set route and assign handler
Router.prototype.on = function(path, handler, opts) {
  var route = {};
  route.keys = [];
  route.re = pathToRegexp(path, route.keys);
  route.handler = handler;
  route.opts = opts;
  this.routes[path] = route;
};

// Set location
Router.prototype.go = function(path) {
  window.location.hash = this.prefix + path;
};

// Go back
Router.prototype.back = function() {
  window.history.back();
};
