var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authenticate=require('./routes/authenticate');
var register=require('./routes/register');

var mongoUtil = require("./db/mongoUtil");

var jwt = require("jsonwebtoken");

var db;
// view engine setup
//
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//
// app.use(function(req,res,next) {
//   if(db == undefined) {
//     mongoUtil.getConnection("mongodb://localhost:27017/Portfolio-Management", function(err,_db) {
//       db = _db;
//       console.log('hi'+db);
//       next();
//     });
//   }
//   else {
//     next();
//   }
var Data=require('./routes/cache');
var chicklet = require("./routes/addChickletData.js");
var postdata=require("./routes/postdata");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:username', Data);
app.use('/',postdata);

app.use('/api',register);
app.use('/api',authenticate);
app.use('/chicklets',chicklet);
// catch 404 and forward to error handler
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
