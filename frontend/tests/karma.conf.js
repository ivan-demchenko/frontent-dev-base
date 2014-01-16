module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ["jasmine"],
    files: [
      'builds/dev/js/*.js',
      'tests/js/*.js'
    ],
    reporters: ['progress', 'junit'],
    browsers: ['Chrome'],
    singleRun: true,
    port: 9876,
    runnerPort: 9999,
    colors: true
  });
};