'use strict';

var views = require('./views'),
    templates = require('./templates'),
    Router = require('./router'),
    routes = require('./routes'),
    Site = require('./site'),
    index = 'landing';

routes.on(':section', section);
routes.on(':section/project/:project', project);
routes.on('*', home);

// After the routes are set, create the site, for menu link
var site = new Site({ template: templates.site });

function home() {
  routes.go(index);
}

function section(matched) {
  var name = matched.args[0],
      View = getView(name),
      template = getTemplate(name);
  setContent(View, template, false);
}

// with page transition animation
function project(matched) {
  var name = matched.args.join('_'),
      View = views.project,
      template = getTemplate(name);
  setContent(View, template, true);
}

// Get content specific view (or base view)
function getView(name) {
  return views[name] || views.view;
}

function getTemplate(name) {
  return templates[name] || false;
}

function setContent(View, template, animate) {
  var view;
  if (template) {
    view = new View({ template: template });
    if (animate) {
      site.setContentAnim(view);
    } else {
      site.setContent(view);
    }
  } else {
    home();
  }
}
