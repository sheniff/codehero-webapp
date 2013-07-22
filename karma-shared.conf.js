var shared = {};

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
shared.singleRun = false
// enable / disable watching file and executing tests whenever any file changes
shared.autoWatch = true
// enable / disable colors in the output (reporters and logs)
shared.colors    = true
shared.growl     = true

// possible values: 'dots', 'progress', 'junit'
shared.defaultReporters = ['progress'];

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
shared.defaultBrowsers = ['Chrome'];

shared.defaultProxies = {
  '/': 'http://localhost:3000/'
};

exports.shared = shared;
