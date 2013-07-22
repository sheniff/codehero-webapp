// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  // 'mocha.conf.js',

  // 3rd Party Code
  'app/bower_components/jquery/jquery.min.js',
  'app/bower_components/angular/angular.js',
  'app/bower_components/angular-ui/build/angular-ui.min.js',

  // App-specific code
  'app/scripts/*.js',
  'app/scripts/**/*.js',

  // Test-specific code
  // 'app/bower_components/chai/chai.js',
  // 'spec/javascripts/lib/chai-should.js',
  // 'spec/javascripts/lib/chai-expect.js',
  'app/bower_components/angular/angular-resource.js',
  'app/bower_components/angular/angular-mocks.js',

  // Test-Specs
  'test/mock/**/*.js',
  'test/spec/**/*.js'
];

// list of files to exclude
exclude = [];


// web server port
port = 8080;
// cli runner port
runnerPort = 9100;
// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

shared = require(__dirname + "/karma-shared.conf.js").shared;
growl     = shared.growl;
colors    = shared.colors;
autoWatch = shared.autoWatch;
singleRun = shared.singleRun;
reporters = shared.defaultReporters;
browsers  = shared.defaultBrowsers;
