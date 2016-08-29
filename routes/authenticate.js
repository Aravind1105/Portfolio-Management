var express = require('express');
var router = express.Router();
var request = require('request');
var mongoUtil = require( '../db/mongoUtil' );
var jwt = require('jsonwebtoken');
var path = require('path');


// router.get('/authenticate', function(req, res) {
//  var db = mongoUtil.getDb();
//  db.collection('authenticate').find({}).toArray(function(err, docs) {
//    if (err) {
//      handleError(res, err.message, "Failed to get contacts.");
//    } else {
//
//      res.status(200).json(docs);
//    }
//  });
//  });


 router.post('/authenticate', function(req, res) {
   console.log(req.headers['x-access-token']);
   var object = req.body;
   console.log(req.body);


   mongoUtil.connectToServer(function(){
   var db = mongoUtil.getDb();
   //console.log(db);
   db.collection('authenticate').find({email:req.body.email,password:req.body.password}).toArray(function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed.");
       console.log("unable to get");
     } else {
    console.log("Displaying Object",doc);
    var token =  jwt.sign({
      user_id: doc[0]._id,
      email: doc[0].email
    },"matta",{
      expiresIn : 86400
    });
    res.status(201).json({"token":token});
  }
 });

});


 });

 router.use(function(req, res, next) {
   // check header or url parameters or post parameters for token
   var token = req.headers['x-access-token'];
   console.log(token);
   // decode token
   if (token) {
     // verifies secret and checks exp
     jwt.verify(token, 'matta', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {
         // if everything is good, save to request for use in other routes
         req.decoded = decoded;
         next();
       }
     });

   } else {
     // if there is no token
     // return an error
     return res.status(403).send({
         success: false,
         message: 'No token provided.'
     });

   }
 });

module.exports = router;
