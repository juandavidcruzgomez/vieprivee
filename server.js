/**
* Module dependencies.
*/
var express  = require('express'),
	mongoose = require('mongoose'),
	morgan   = require('morgan'),	//log every request in console
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');


/**
* Application configuration
*/
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:'true', limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(methodOverride());


// Express session storage
app.use(session({
	secret: '123456789QWERTY',
	cookie: { maxAge: 60 * 60 * 24 }
}));

app.use(express.static(__dirname + '/client'));
/**
* Routing configuration...
*/
var router = express.Router();

require('./server/base/BaseRoutes')( router);

//The rest of it...
app.use('/api', router );

/**
* Error handling...
*/
app.use( function( req, res, next ){
	var err = new Error("Path not found");
	err.status = 404;
	next(err);
});

app.use( function( err, req, res, next ){
	console.log( err );
	res.status(err.status || 500 ).end();
});

/**
* Start the server
*/

var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 8001);

var server = app.listen(app.get('port'), function(){
	console.log( '===========================================' );
	console.log( 'Express server listening on port ' + server.address().port );
	console.log( 'Environment: ' + env );
});
