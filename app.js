
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');


//Bootstrap db connection
var uristring = 
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/userManager';
mongoose.connect(uristring);

//Bootstrap models
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file){
	if(~file.indexOf('js')) require(models_path + '/' + file);
});

var routes = require('./routes');
var user = require('./routes/user');
var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('this is my app secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);

//Restfull API Routes
app.get('/api/users', user.list);
app.get('/api/users/:id', user.detail);
app.post('/api/users', user.create);
app.put('/api/users/:id', user.update);
app.del('/api/users/:id', user.remove);

http.createServer(app).listen(app.get('port'), function(){
  console.log('User Manager  server listening on port ' + app.get('port'));
});
