/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  getEnvJSON: require('./config/environment')
});

// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');

app.import('vendor/d3/d3.js');
app.import('vendor/nvd3/nv.d3.js');
app.import('vendor/nvd3/nv.d3.css');

app.import('vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js');



// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});


// Put the bootstrap fonts in the place that the bootstrap
// css expects to find them.
var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('vendor/bootstrap-sass-official/vendor/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});


var uglifyJavaScript = require('broccoli-uglify-js');
var appTree = uglifyJavaScript(app.toTree(), {});


var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([appTree,bootstrapFonts]);
