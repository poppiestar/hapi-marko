var marko;

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
			var template = marko.load(options.filename);

			process.nextTick(function () {
				callback(null, function(context, options, callback) {
					template.render(context, callback);
				});
			});
		}
	},
	compileMode: 'async'
}

