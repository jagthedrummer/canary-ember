/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  legacyFilesToAppend: [
    'jquery.js',
    'handlebars.js',
    'ember.js',
    'ic-ajax/dist/named-amd/main.js',
    'ember-data.js',
    'app-shims.js',
    'ember-resolver.js',
    'ember-load-initializers.js'
  ],

  // AKA whitelisted modules
  ignoredModules: [
    'ember',
    'ember/resolver',
    'ember/load-initializers',
    'ic-ajax'
  ],

  // hack we can hopefully remove as the addon system improves
  importWhitelist: {
    'ember': ['default'],
    'ember/resolver': ['default'],
    'ember/load-initializers': ['default']
  },

  // hack
  getEnvJSON: require('./config/environment')
});

// default ember app source tree
var emberApp = app.toTree();



/*
var pickFiles = require('broccoli-static-compiler');
var mergeTrees  = require('broccoli-merge-trees');

// get a hold of the tree in question
var bootstrap = pickFiles('vendor', {
  srcDir: '/bootstrap/dist/css',
  files: [
    'bootstrap.css',
    //'bootstrap/_variables.scss'
  ],
  destDir: '/assets/'
});



// shim in custom assets
var appAndCustomDependencies = mergeTrees([emberApp, bootstrap], {
  overwrite: true
});

module.exports = appAndCustomDependencies;
*/

var mergeTrees  = require('broccoli-merge-trees');
var concat = require('broccoli-concat');
var vendorCss = concat('vendor', {
  inputFiles: [
    'bootstrap/dist/css/bootstrap.css',
    'nvd3/nv.d3.css'
   ],
  outputFile: '/assets/vendor.css'
});

var vendorJs = concat('vendor',{
  inputFiles: [
    'd3/d3.js',
    'nvd3/nv.d3.js'
  ],
  outputFile: '/assets/vendor.js'
});

var appAndCustomDependencies = mergeTrees([emberApp, vendorCss, vendorJs], {
  overwrite: true
});

module.exports = appAndCustomDependencies;

// original exports
//module.exports = app.toTree();

