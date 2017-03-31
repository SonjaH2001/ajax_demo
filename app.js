var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
//I added this definition.
var MongoClient = require('mongodb').MongoClient;
//I added these.
var routes = require('./routes/index');

var app = express();

// where does the end brace go?-at the bottom, w/ );
//added this to request mondo db.  removed the admin and pw request.
var mongo_pw = process.env.MONGO_PW;
var url = 'mongodb://@localhost:27017/travelList';
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('connected to MongoDB');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res, next){
    req.db = db.collection('locations');
    next();
});

// app.use('/', index);
//i added these
app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
});
//database callback end here
module.exports = app;
