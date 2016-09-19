var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.patch("/api/deletechicklet", function(req, res, next) {
  console.log(req.body._id);
  var db = require("../db/mongoUtil").getConnection();
  db.collection("portfolio_cache").update({
    'profiles.sections.chicklets._id': ObjectId(req.body._id)
  }, {
    $pull: {
      "profiles.sections.$.chicklets": {
        $elemMatch: {
          "_id": ObjectId(req.body._id)
        }
      }
    }
  }, function(err, doc) {
    console.log("UPDATED DOCUMENT........>>>>>>>>>>>>>>>>>>", err, doc);
  });
  res.status(200).json(req.body);

});

module.exports = router;
