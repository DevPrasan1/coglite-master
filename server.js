var express = require('express');
var app = express();
var minimist = require('minimist');
var bodyParser = require('body-parser');

const routes = require('./api/routes');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mode
var knownArguments = {
	string: 'NODE_ENV'
};


var aruments = minimist(process.argv.slice(2), knownArguments);

//
if(aruments.NODE_ENV=='production'){	
	console.log('Expose Production Bundle');
	app.use(express.static(__dirname+'/app/dist'));
}else{
	console.log('Expose Development Files');	
	app.use(express.static(__dirname+'/app',{index:'index-dev.html'}));
}

app.use('/npm-libs',express.static(__dirname+'/node_modules'))

// Set our api routes
app.use('', routes);


var port = 3000;
app.listen(port,function(){
	console.log('Server Started on port: '+port);
})