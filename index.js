var BeReporter = function (baseReporterDecorator, formatError, config) {
  var beConfig = config.beReporter;
  var BaseReporter = getBaseReporterConstructor(beConfig.baseReporter);

  var stackTraceTransform = beConfig.stackTraceTransform || null;

    if (stackTraceTransform) {
        var transform = require(stackTraceTransform);
        var _formatError = formatError;
        formatError = function() {
            var rest = [].slice.call(arguments, 1);
            var newStackTrace = transform(arguments[0]);

            return _formatError.apply(null, [newStackTrace].concat(rest));
        };
    }

  BaseReporter.call(this, baseReporterDecorator, formatError, config);
};

// inject karma runner baseReporter and config
BeReporter.$inject = ['baseReporterDecorator', 'formatError', 'config'];

// PUBLISH DI MODULE
module.exports = {
    'reporter:be': ['type', BeReporter]
};

/**
 * Finds the constructor from the dynamically loaded base reporter
 *
 * @param  {String} baseReporterOption - Module name of the reporter to inherit from
 * @return {Function} The constructor function for the base reporter
 */
function getBaseReporterConstructor(baseReporterOption) {
  var baseReporterExport = require(baseReporterOption);

  var baseReporterName = Object.keys(baseReporterExport).filter(function(key) {
    return key.indexOf('reporter:') !== -1;
  })[0];

  return baseReporterExport[baseReporterName][1];
}
