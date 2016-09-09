var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var register=require('./routes/register');
var mongoUtil = require("./db/mongoUtil");
var jwt = require("jsonwebtoken");
var temp=require("./routes/searchTerm");
var authenticate=require('./routes/authenticate');

var db;

app.use(function(req,res,next) {
  if(db == undefined) {
    mongoUtil.getConnection("mongodb://10.219.85.76:27017/Portfolio-Management", function(err,_db) {
      db = _db;
      next();
    });
  }
  else {
    next();
  }
});
var Data=require('./routes/cache');
var chicklet = require("./routes/addChickletData.js");
var postdata=require("./routes/postdata");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/register',register);
app.use('/profile/:id',express.static(path.join(__dirname, 'public')));
app.use('/', Data);
app.use('/',postdata);
app.use('/chicklets',chicklet);
app.use('/post', postdata);
app.use('/',temp);
app.use('/api',authenticate);
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
