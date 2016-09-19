var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

router.patch("/postdata", function(req, res, next) {
  var chicklet1 = {};
  var db = require("../db/mongoUtil").getConnection();

  var form = formidable.IncomingForm({
    uploadDir: '/vagrant/Portfolio-Management/public/images', // don't forget the __dirname here
    keepExtensions: true
  });

  form.parse(req, function(err, fields, files) {
    if (err)
      throw err;
    body = fields.resource;
    newchickletid = fields.newchickletid;
    body = JSON.parse(body);

    body.profiles.sections.forEach(function(section) {
      section.chicklets.forEach(function(chicklet) {

        if (files && files.file && section.section_id === "ABOUT_ME" && chicklet.chickletid === "PROFILE_DATA" && chicklet._id === newchickletid) {
          console.log("file path--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", files.file.path);
          var fileExt = path.extname(files.file.path);
          var fileName = path.basename(files.file.path, path.extname(files.file.path));
          fs.rename(files.file.path, path.dirname(files.file.path) + "/" + body.userId + fileExt, function(err) {

          });
          chicklet.chicklet_data.image["value"] = ' /images/' + body.userId + fileExt;
        }
        chicklet._id = ObjectId(chicklet._id);
      });
    });
    db.collection('portfolio_cache').update({
      "userId": ObjectId(body.userId)
    }, {
      $set: {
        "profiles": body.profiles
      }
    }, function(err, doc) {
      if (err)
        throw err;
    });
    var userProfile = (body.profiles);
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
      "_id": ObjectId(body.userId)
    }, {
      $set: {
        "profiles": userProfile
      }
    });
    console.log("USER PROFILE");
    console.log(userProfile);
    res.status(200).json(body);
    var termExtraction = require("../routes/termbackup").buildIndexes(body);
  });
});
module.exports = router;
