
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var homepage = require('./routes/homepage');
var classfile = require('./routes/class');
var help = require('./routes/help');
var myprofile = require('./routes/my-profile');
var profile = require('./routes/profile');
var signup = require('./routes/sign-up');
var groups = require('./routes/groups');
// Example route
// var user = require('./routes/user');

var app = express();
app.configure(function () {
  app.use(express.bodyParser());
});

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.initialize);
app.post('/', index.authenticate);
app.get('/homepage', homepage.initialize);
app.get('/class', classfile.initialize);
app.get('/help', help.initialize);
app.get('/sign-up', signup.initialize);
app.get('/profile', profile.initialize);
app.get('/my-profile', myprofile.initialize);
app.get('/addClass', homepage.addClass);
app.get('/addUser', signup.addUser);
app.get('/logout', index.logout);
app.post('/help', help.mail);
app.get('/removeClass', homepage.removeClass);
app.get('/groups', groups.initialize);
app.post('/updatePassword', myprofile.updatePassword);
app.post('/updateName', myprofile.updateName);
app.post('/updateEmail', myprofile.updateEmail);




/// Include the node file module

/// Post files
app.post('/upload', myprofile.upload)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
app.listen(8080)