var express = require('express');
var router = express.Router();
var request = require('request');
router.get("/generator", function(req, res, next) {
  var ObjectId = require("mongodb").ObjectID;
  var obj = ObjectId();
  console.log(obj);
  res.status(200).json(obj);
});
module.exports = router;
