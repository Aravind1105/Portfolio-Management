var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
router.patch("/postdata",function(req,res,next) {
  var db = require("../db/mongoUtil").getConnection();
  // try {
  console.log("id");
    console.log(req.body.userId);
    req.body.profiles.sections.forEach(function(section) {
      section.chicklets.forEach(function(chicklet) {
        chicklet._id = ObjectId(chicklet._id);
      });
    });
    // db.collection('portfolio-_cache').find({"userId":})
    db.collection('portfolio_cache').update({"userId":ObjectId(req.body.userId)},
    {
      $set:
          {
            "profiles":req.body.profiles
          }
    });
    res.status(200).json(req.body);
    // var termExtraction = require("../routes/termbackup").buildIndexes(req.body);
  // } catch (err) {
  //   console.log(err);
  // }
});
module.exports = router;
