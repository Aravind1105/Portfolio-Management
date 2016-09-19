var express = require("express");
var router = express.Router();
var obj1 = [];
var obj2 = [];
var obj3 = [];
var obj33 = [];
router.get('/getdata', function(req, res, next) {
  var st = require('../routes/searchTerm').getLocationDic();
  console.log(st);
  res.status(200).json(st);
});

module.exports = router;
