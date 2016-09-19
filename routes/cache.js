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
          console.log(object.length);
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
            console.log("Starting MERGE operation");
            var userId = userProfile[0]._id;
            finalObj=_.merge(userProfile[0],portfolioDefn[0]);
            finalObj.userId = userId;
            finalObj = _.omit(finalObj,"_id");
            userProfile[0].profiles.sections.forEach(function(userProfilesection,index) {
             portfolioDefn[0].profiles.sections.forEach(function(portfolioDefnsection,index) {
               if(userProfilesection.section_id == portfolioDefnsection.section_id) {
                  mergedSections=_.merge(userProfilesection,portfolioDefnsection);
                  console.log("MERGED SECTIONS--->>>>");
                  console.log(mergedSections);
                  userProfilesection.chicklets.forEach(function(userProfilechicklet,index) {
                     portfolioDefnsection.chicklets.forEach(function(portfolioDefnchicklet,index) {
                       if(userProfilechicklet.chickletid == portfolioDefnchicklet.chickletid) {
                          mergedChicklets=_.merge(userProfilechicklet,portfolioDefnchicklet);
                          console.log("mergedChicklets ID");
                          console.log(mergedChicklets.chickletid);
                          mergedSections.chicklets.forEach(function(chicklet,mergedSectionsindex) {
                            console.log(chicklet.chickletid);
                          if(chicklet.chickletid == mergedChicklets.chickletid) {
                            console.log("inside objectID");
                            mergedChicklets._id=ObjectId();
                            console.log(mergedSections);
                          mergedSections.chicklets[mergedSectionsindex] = mergedChicklets;
                          console.log(mergedSections.chicklets)
                        }
                      });
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
            console.log(finalObj.profiles.sections);
            var tempObj = _.clone(finalObj);
            finalObj.profiles.sections.forEach(function(section,index) {
              section.chicklets = section.chicklets.filter(function(chicklet) {
                var toBeDeleted = true;
                for(property in chicklet.chicklet_data) {
                  console.log(property);
                  if(_.has(chicklet.chicklet_data,[property,"value"])) {
                    console.log("NOTN DELETYUING");
                    toBeDeleted = false;
                  }
                };
                console.log("TOBE DELETEDF",toBeDeleted);
                return !toBeDeleted;
              });
              console.log(section);
            });
              console.log("Final OBJ --------<>>>>>>>>>>>>>>>>>>>>")
            console.log(finalObj);
            db.collection('portfolio_cache').insert(finalObj, function(err,cachedPortfolio) {
              console.log(err);
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
//api for contact chips
router.get('/skills/:str?', function(req,res,next) {
    console.log("contact chips typed string----->>>>>>>",req.params.str);
    var db = require("../db/mongoUtil").getConnection();
    console.log("after connection");
    db.collection("lexicons").find({"skills": new RegExp("^"+req.params.str,"i")}).toArray(function(err, object) {
        console.log("inside contact chips");
        console.log("error is "+err);
        // object.forEach(function(obj){
        //   console.log(obj.skills);
        // });
        // // console.log(object[0].skills);
  res.status(200).json(object);
    });

  });


// router.post('/updateSkills',function(req,res){
//   var user=req.body;
//   console.log(user);
//   db.collection('user_profile').update({'_id':ObjectId(user.id),"sections.$.section_id":"PROJECTS","chicklets.$._id":ObjectId("57d177a544cbc49fe35ffc9f")},{"chicklet_data.tech_skills_used.value":user.skills},function(err,response){
//     if(err) throw err;
//     else {
//       console.log(response);
//       res.status(200).json(response);
//     }
//   })
// });
module.exports = router;
