var express = require("express");
var router = express.Router();
var _ = require('lodash');
var ObjectId = require("mongodb").ObjectID;
      // console.log(object.length);

router.get('/:username/getdata', function(req,res,next) {
  var mergedChicklets=[];
  var userProfile=[];
  var portfolioDefn=[];
  var mergedSections=[];
  var mergedobj=[];
    console.log("USERNAME----->>>>>>>",req.params.username);
    var db = require("../db/mongoUtil").getConnection();
    db.collection('portfolio_cache').find({"userId":ObjectId(req.params.username)}).toArray(function(err, object) {
        if(object.length > 0) {
          console.log("GOT portfolio_cache");
          res.status(200).json(object);
        }
        else {
          console.log("DIDNT find portfolio_cache");
          db.collection('user_profile').find({"_id":ObjectId(req.params.username)}).toArray(function(err, doc) {
            userProfile=doc;
            console.log("USER profiles");
            console.log(userProfile[0]);
            console.log("Found User Profile");
            console.log(userProfile);
          db.collection('portfolio_definition').find().toArray(function(err, pdoc) {
            console.log("Fecthed portfolioDefn");
            portfolioDefn=pdoc;
            console.log("Starting MERGE operastion");
            var userId = userProfile[0]._id;
            finalObj=_.merge(userProfile[0],portfolioDefn[0]);
            finalObj.userId = userId;
            finalObj = _.omit(finalObj,"_id");
            userProfile[0].profiles.sections.forEach(function(userProfilesection,index)
            {
             portfolioDefn[0].profiles.sections.forEach(function(portfolioDefnsection,index)
              {
               if(userProfilesection.section_id == portfolioDefnsection.section_id)
                {
                  mergedSections=_.merge(userProfilesection,portfolioDefnsection);
                  userProfilesection.chicklets.forEach(function(userProfilechicklet,index)
                   {
                     portfolioDefnsection.chicklets.forEach(function(portfolioDefnchicklet,index)
                     {
                       if(userProfilechicklet.chickletid == portfolioDefnchicklet.chickletid)
                       {
                          mergedChicklets=_.merge(userProfilechicklet,portfolioDefnchicklet);
                          if(mergedSections.chicklets.chickletid == mergedChicklets.chickletid){
                            mergedChicklets._id=ObjectId();
                          mergedSections.chicklets[index].chicklet_data.push(mergedChicklets);
                        }

                       }
                   });
                 });
                 console.log("Pushing section into mergedobj");
                mergedobj.push(mergedSections);
                }
             });
           });
            finalObj.profiles.sections=mergedobj;
            console.log("Inserting into portfolio_cache");
            db.collection('portfolio_cache').insert(finalObj, function(err,cachedPortfolio) {
              console.log("Cached portfolio");
              console.log(cachedPortfolio);
              res.json(cachedPortfolio);
            });
            finalObj=[];
        });
      });
      }
   });
});

module.exports = router;
