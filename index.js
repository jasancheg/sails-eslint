var glob = require('glob');
var path = require('path');
var chalk = require('chalk');
var CLI = require('eslint').CLIEngine;

var cli = new CLI({});

function runLint(pattern, format) {
  var formatter = cli.getFormatter(format);
  var report = cli.executeOnFiles([pattern]);

  if (report && report.errorCount > 0) {
    console.log(
      chalk.red('Code did not pass lint rules') +
      formatter(report.results)
    );
  } else {
    if (report && report.warningCount > 0 ) {
      console.log(formatter(report.results));
    }
  }
}

module.exports = function (sails) {

  return {

    /**
    * Default configuration
    *
    * We do this in a function since the configuration key for
    * the hook is itself configurable, so we can't just return
    * an object.
    */
    defaults: {

      __configKey__: {
        // Turn eslint checks on/off
        check: true,
        // choose which formatter to use
        formatter: 'stylish',
        // decide which folders/patterns should be checked
        patterns: [
          path.resolve(sails.config.appPath, 'api'),
          path.resolve(sails.config.appPath, 'config')
        ]
      }
    },

    /**
    * Initialize the hook
    * @param  {Function} cb Callback for when we're done initializing
    */
    initialize: function (cb) {

      // If the hook has been deactivated, just return
      if (!sails.config[this.configKey].check) {
        sails.log.verbose('Eslint hook deactivated.');
        return cb();
      } else {

        var format = sails.config[this.configKey].formatter || 'stylish';
        var patterns = sails.config[this.configKey].patterns || ['api', 'config'];

        patterns.forEach(function (pattern) {
          if (glob.hasMagic(pattern)) {
            glob.sync(pattern).forEach(function (file) {
              runLint(file, format);
            });
          } else {
            runLint(pattern, format);
          }
        });
        return cb();
      }
    }
  };
};
