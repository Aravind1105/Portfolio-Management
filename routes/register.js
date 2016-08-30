var express = require('express');
var router = express.Router();
var request = require('request');
var mongoUtil = require( '../db/mongoUtil' );
var jwt = require('jsonwebtoken');

router.post('/register', function(req, res)
{
  console.log("api");
  var object = req.body;
  // mongoUtil.getConnection(function(){
  var db = mongoUtil.getConnection();

  db.collection('authenticate').insertOne(object, function(err, doc)
  {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc);
    }
  });
// });
});


module.exports = router;
