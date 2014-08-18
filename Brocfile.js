/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/d3/d3.js');
app.import('vendor/nvd3/nv.d3.js');
app.import('vendor/nvd3/nv.d3.css');

app.import('vendor/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js');


// Put the bootstrap fonts in the place that the bootstrap
// css expects to find them.


var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('vendor/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/fonts/bootstrap'
});

var uglifyJavaScript = require('broccoli-uglify-js');
var appTree = uglifyJavaScript(app.toTree(), {});


var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([appTree,bootstrapFonts]);


// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

//module.exports = app.toTree();
