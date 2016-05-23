// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// WARNING: THIS HOOK USES PRIVATE, UNDOCUMENTED APIs THAT COULD CHANGE AT ANY TIME
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// This hook uses an undocumented, private Sails core method in order to reload controllers without
// having to lower/re-lift an app. You should not copy or reuse that code (clearly marked below) in an
// app, because future releases of Sails--even patch releases--may cause it to stop functioning.
// The private API usage used below will be replaced by a public method as soon as it is available.
// In the meantime, enjoy, and as stated in the README, do not turn this hook on in production!
var glob = require('glob');
var path = require('path');
var chalk = require('chalk');
// Initialize eslint cli engine
var CLI = require('eslint').CLIEngine;
var cli = new CLI({});

function runLint(dir, format) {
  var formatter = cli.getFormatter(format);
  var report = cli.executeOnFiles([dir]);

  if (report && report.errorCount > 0) {
    console.log(
      chalk.red('error: Code did not pass lint rules') +
      formatter(report.results)
    );
  } else {
    if (report && report.warningCount > 0 ) {
      console.log(formatter(report.results));
    }
  }
}

module.exports = function (sails) {
  console.log(process.cwd(), path.join(__dirname, 'node_modules', 'eslint-formatter-pretty'))
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
        // Turn eslint on/off
        active: true,
        //use polling to watch file changes
        //slower but sometimes needed for VM environments
        usePolling: false,
        // choose which formatter to use
        formatter: path.join(__dirname, 'node_modules', 'eslint-formatter-pretty'),
        // decide which folders/dirs should be checked
        dirs: [
          path.resolve(sails.config.appPath, 'api'),
          path.resolve(sails.config.appPath, 'config')
        ],
        // Ignored paths, passed to anymatch
        // String to be directly matched, string with glob patterns,
        // regular expression test, function
        // or an array of any number and mix of these types
        ignored: []
      }
    },

    configure: function() {
      sails.config[this.configKey].active =
        // If an explicit value for the "active" config option is set, use it
        (typeof sails.config[this.configKey].active !== 'undefined') ?
          // Otherwise turn off in production environment, on for all others
          sails.config[this.configKey].active :
            (sails.config.environment != 'production');
    },

    /**
    * Initialize the hook
    * @param  {Function} cb Callback for when we're done initializing
    */
    initialize: function (cb) {

      var self = this;

      // Initialize the file watcher to watch controller and model dirs
      var chokidar = require('chokidar');
      // Watch both the controllers and models directories
      var watcher = chokidar.watch(sails.config[this.configKey].dirs, {
        // Ignore the initial "add" events which are generated when Chokidar
        // starts watching files
        ignoreInitial: true,
        usePolling: sails.config[this.configKey].usePolling,
        ignored: sails.config[this.configKey].ignored
      });

      // If the hook has been deactivated, just return
      if (!sails.config[this.configKey].active) {
        sails.log.verbose('Eslint hook deactivated.');
        return cb();
      } else {

        var format = sails.config[this.configKey].formatter || 'stylish';
        var dirs = sails.config[this.configKey].dirs || ['api', 'config'];
        var formatDirs = [];
        var paths = '';

        if(sails.config[this.configKey].dirs) {
          sails.config[this.configKey].dirs.forEach(function(item){
            formatDirs.push('path: ' + item.replace(process.cwd(), ''));
          });
          paths = chalk.yellow('\n' + formatDirs.join('\n'));
        }

        sails.log.verbose("Eslint watching: ", sails.config[this.configKey].dirs);
        sails.log.info(chalk.blue("Eslint watching:"), paths);

        dirs.forEach(function (dir) {
          if (glob.hasMagic(dir)) {
            glob.sync(dir).forEach(function (file) {
              runLint(file, format);
            });
          } else {
            runLint(dir, format);
          }
        });
        return cb();
      }
    }
  };
};
