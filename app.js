var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoUtil = require("./db/mongoUtil");
var app = express();
var db;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
console.log("map");
// if(){
//   map[chic
// }
app.use(function(req,res,next) {
  if(db == undefined) {
    mongoUtil.getConnection("mongodb://localhost:27017/portfolio", function(err,_db) {
      db = _db;
      console.log('hi'+db);
      next();
    });
  }
  else {
    next();
  }
});
// var Data=require('./routes/portfolio_cache');
var Data1=require('./routes/cache');
// var routes=require('./routes');

var Data=require('./routes/portfolio_cache');
var postdata=require('./routes/postdata');
var chicklet = require("./routes/addChickletData.js");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/post', postdata);
app.use('/:username', Data1);
app.use('/chicklets',chicklet);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.jade', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no st`acktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.jade', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
