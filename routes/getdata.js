var fs=require('fs'),
                json;
var express = require('express');
var readline = require('readline');
var router = express.Router();
var request = require('request');

router.get('/api/getData', function(req, res,next) {
var obj;
fs.readFile('./public/json/aboutme.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  // console.log(obj);
  res.json(obj.profiles);
});
});


router.post('/api/profile', function(req, res,next) {
var obj;
fs.writeFile('./public/json/aboutme.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  // console.log(obj);
  res.json(obj.profiles);
});
});
module.exports = router;
