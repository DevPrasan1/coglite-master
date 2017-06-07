var minimist = require('minimist');

var knownArguments = {
	string: 'NODE'
};


var aruments = minimist(process.argv.slice(2), knownArguments);

console.dir(arguments);