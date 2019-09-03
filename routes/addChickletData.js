var express = require('express');
var router = express.Router();
var request = require('request');
var mongoUtil = require('../db/mongoUtil');
router.get('/:type', function(req, res) {
  var chicklets = [];
  var db = mongoUtil.getConnection();
  db.collection('portfolio_definition').find({
    'type': req.params.type
  }).toArray(function(err, doc) {
    doc[0].profiles.sections.forEach(function(section, index) {
      section.chicklets.forEach(function(chicklet, index) {
        for (key in chicklet.chicklet_data) {
          if (typeof chicklet.chicklet_data[key] === "object") {
            chicklet.chicklet_data[key]["value"] = "";
            chicklet.sectionName = section.section_id;
          }
        }
        console.log(chicklet);
        chicklets.push(chicklet);
      });
    });
    res.status(200).json(chicklets);
  });
});
module.exports = router;
