

module.exports = function (config) {
    config.set({
  
      plugins: [
        'karma-coverage'
      ],
  
      reporters: ['progress', 'coverage'],
  
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        reporters: [
          { type: 'html', subdir: 'report-html' },
          { type: 'lcov', subdir: 'report-lcov' },
          { type: 'text-summary' },
        ],
      },
    });
  };
  