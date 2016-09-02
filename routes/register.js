var express = require('express');
var router = express.Router();
var request = require('request');
var mongoUtil = require( '../db/mongoUtil' );
var jwt = require('jsonwebtoken');

router.get('/:email?',function(req,res){
   var db = mongoUtil.getConnection();
 var email=req.param('email');
 console.log(email);
 db.collection('authenticate').find({'email':email}).toArray(function(err,user){
   console.log('user');
   if(err) throw err;
   else {
     console.log('inside else');
     // var user =JSON.stringify(user.email);
     // console.log(user);
     res.status(200).json(user[0]);
     // res.status(200).send(email);
   }
 });
})
router.post('/', function(req, res)
{
 console.log("api");
 var object = req.body;
 var newUser = req.body.email ;
 console.log(request.body.email);
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
 db.collection('user_profile').insertOne(newUser, function(err, doc)
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
