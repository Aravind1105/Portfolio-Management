var express = require('express');
var router = express.Router();
var request = require('request');
var mongoUtil = require('../db/mongoUtil');
var jwt = require('jsonwebtoken');
var obj1;
router.get('/:email?', function(req, res) {
  var db = mongoUtil.getConnection();
  var email = req.param('email');
  db.collection('authenticate').find({
    'email': email
  }).toArray(function(err, user) {
    console.log('user');
    if (err) throw err;
    else {
      console.log('inside else');
      res.status(200).json(user[0]);
    }
  });
});

router.post('/', function(req, res) {
  console.log("api");
  console.log(req.body);
  var object = req.body;
  var db = mongoUtil.getConnection();
  var user = {};
  db.collection('signupProfile').find().toArray(function(err, doc) {
    user.profiles = doc[0].profiles;
    user.profiles.sections.forEach(function(section, index) {
      section.chicklets.forEach(function(chicklet, index) {
        if (chicklet.chickletid === 'PROFILE_DATA') {
          console.log("inside profile");
          console.log(chicklet.chicklet_data.name.value);
          chicklet.chicklet_data.name.value = req.body.username;
          console.log(chicklet.chicklet_data.name.value);
        }
        if (chicklet.chickletid === 'CONTACT_INFORMATION') {
          console.log("inside contact");
          console.log(chicklet.chicklet_data.email.value);
          chicklet.chicklet_data.email.value = req.body.email;
        }
      });
    });
    db.collection("user_profile").insertOne(user, function(err, user) {
      console.log("After insert");
      console.log(user);
      var authUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        userProfileId: user.ops[0]._id
      }
      db.collection("authenticate").insertOne(authUser, function(err, authUser) {
        console.log("After inserting into auth coll");
        console.log(authUser);
      })
      res.status(200).json(authUser);
    });
  });
});
module.exports = router;
