var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
router.post("/postdata",function(req,res,next) {
  // try {
    // console.log(req.body);
    req.body.sections.forEach(function(section) {
      section.chicklets.forEach(function(chicklet) {
        console.log(chicklet._id);
        chicklet._id = ObjectId(chicklet._id);
      });
    });
    var db = require("../db/mongoUtil").getConnection();
    // console.log(req.body.sections[8]);
    // var termExtraction = require("../routes/termbackup").buildIndexes(req.body);
    db.collection('portfolio_cache').update({"profiles.id":req.body.id},
    {
      $set:
          {
            "profiles":req.body
          }
    });
    res.status(200).json(req.body);
  // } catch (err) {
  //   console.log(err);
  // }
});
module.exports = router;
