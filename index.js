var marko;

try {
	marko = require('marko');
}
catch (ex) {}

if (!marko) throw new Error('"marko" module not found');

module.exports = {
	module: {
		compile: function(template, options, callback) {
			var loadedTemplate = marko.load(options.filename);

			process.nextTick(function () {
				callback(null, function(context, options, callback) {
					loadedTemplate.render(context, callback);
				});
			});
		}
	},
	compileMode: 'async'
};

