module.exports = function(config) {
  config.set({
    files : [
      'app/lib/jquery/dist/jquery.js',
      'app/lib/angular/angular.js',
      'app/lib/angular-route/angular-route.js',
      'app/lib/angular-animate/angular-animate.js',
      'app/lib/angular-mocks/angular-mocks.js',
      'app/scripts/2gather.js',
      'app/scripts/tgAnimations.js',
      'app/scripts/data.js',
      'test/unit/**/*.js'
    ],
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};