var express = require("express");
var router = express.Router();
var _ = require('lodash');
var obj=[];
var result={};
router.get('/:username/:portfolioId', function(req,res,next) {
  var db = require("../db/mongoUtil").getConnection();
    db.collection('user_profile').find({}).toArray(function(err, docs) {
        obj.push(docs);
    });
    db.collection('portfolio_definition').find({}).toArray(function(err, docs) {
        obj.push(docs);
        var obj1=obj[0];
        var obj2=obj[1];
       result=_.merge(obj2, obj1);
       db.collection("portfolio_cache").insert(result);
       res.status(200).json(result);
    });
});
module.exports = router;
