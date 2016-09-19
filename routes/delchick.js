var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
router.patch("/api/delchick", function(req, res, next) {
  var chicklet1 = {};
  var db = require("../db/mongoUtil").getConnection();
  // try {
  console.log(req.body.userId);
  req.body.profiles.sections.forEach(function(section) {
    section.chicklets.forEach(function(chicklet) {
      chicklet._id = ObjectId(chicklet._id);
    });
  });
  db.collection('portfolio_cache').update({
    "userId": ObjectId(req.body.userId)
  }, {
    $set: {
      "profiles": req.body.profiles
    }
  });

  var userProfile = (req.body.profiles);
  userProfile.sections.forEach(function(section) {
    section.chicklets.forEach(function(chicklet) {
      //  chicklet1.chicklet_data={};
      for (key in chicklet.chicklet_data) {
        if (typeof chicklet.chicklet_data[key] === "object") {
          delete chicklet.chicklet_data[key]["displayName"];
          //  chicklet1.chicklet_data[key]={};
          //  chicklet1.chicklet_data[key]["value"]=chicklet.chicklet_data[key]["value"];
        }
      }
      //  console.log(chicklet);
      // chicklet=chicklet1;
    });
  });
  // console.log(req.body.profiles);
  // console.log(userProfile);
  db.collection('user_profile').update({
    "_id": ObjectId(req.body.userId)
  }, {
    $set: {
      "profiles": userProfile
    }
  });
  console.log("USER PROFILE");
  console.log(userProfile);
  res.status(200).json(req.body);
  var termExtraction = require("../routes/termbackup").buildIndexes(req.body);
  // } catch (err) {
  //   console.log(err);
  // }
});
module.exports = router;
