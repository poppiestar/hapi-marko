var marko;
var fs = require('fs');
var Path = require('path');

try {
	marko = require('marko');
}
catch (ex) {}

if (!marko) throw new Error('"marko" module not found');

var getBaseDir = function(options) {
	if (options && options.baseDir) {
		return options.baseDir;
	}

	return '';
}

var getTemplateExt = function(options) {
	if (options && options.defaultExt && options.defaultExt.length > 0) {
		return '.' + options.defaultExt;
	}

	return '.marko';
}

module.exports = {
	module: {
		compile: function(template, options, callback) {
			dust.onLoad = function(name, callback) {
				var templateFile = Path.join(getBaseDir(options), name + getTemplateExt(options));
				fs.readFile(templateFile, function(err, data) {
					if (err) {
						throw err;
					}

					callback(err, data.toString());
				});
			}

			var compiled = marko.compileFn(template, options && options.name);

			process.nextTick(function () {
				callback(null, function(context, options, callback) {
					compiled(context, callback);
				});
			});
		}
	},
	compileMode: 'async'
}

